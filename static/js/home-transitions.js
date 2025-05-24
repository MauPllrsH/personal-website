/*
event.preventDefault() stops normal link behavior
overlay.style.display = 'flex' shows the overlay
setTimeout(() => { ... }, 1500) waits 1.5 seconds
window.location.href = '/htb' navigates to HTB page
*/

document.addEventListener('DOMContentLoaded', function() {
    const htbLink = document.getElementById('htb-link');
    const overlay = document.getElementById('matrix-overlay');
    
    htbLink.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Show overlay and start fade in
        overlay.style.display = 'flex';
        setTimeout(() => {
            overlay.classList.add('show');
        }, 10);
        
        // Navigate when overlay is FULLY VISIBLE (after fade in completes)
        setTimeout(() => {
            window.location.href = '/htb';
        }, 3100); // Navigate right after fade in completes (0.3s + buffer)
        
        // Remove all the fade out logic - let the new page handle hiding the overlay
    });
});
