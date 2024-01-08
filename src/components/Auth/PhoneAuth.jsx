import { useState } from "react";
import { auth } from "../../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

export function PhoneAuth() {

    const [otp, setOtp] = useState('');

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => { onSignUp() },
                'expired-callback': () => { }
            });
        }
    }

    function onSignUp() {
        onCaptchVerify();
        const appVerifier = window.recaptchaVerifier;
        const phoneNumber = '+22952879179';
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                console.log(confirmationResult);
            }).catch((error) => {
                console.log(error);
            });
    }
    function onOtpVerify() {
        window.confirmationResult.confirm(otp).then(
            async (res) => {
                console.log(res);
            }
        ).catch(err => {
            console.log(err);
        })
    }
    return (
        <>
            <div id="recaptcha-container">
            </div>
            <button onClick={onSignUp}>send</button>
            <input className="w-5/12" value={otp} onChange={(e) => setOtp(e.target.value)}></input>
            <button onClick={onOtpVerify}>connexion</button>
        </>
    )
}