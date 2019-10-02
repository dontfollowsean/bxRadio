/* 
    - This is to check what device a user is on, so the recently played songs have proper padding to it
*/

if ('userAgent' in navigator) {
    if (navigator.userAgent.includes('iPhone')) {
        document.body.classList.add('iphone');
    } else if (navigator.userAgent.includes('Android')) {
        document.body.classList.add('android');
    }
}