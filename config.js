// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    // Your Valentine's name that will appear in the title
    // Example: "Jade", "Sarah", "Mike"
    valentineName: "Kyle",

    // The title that appears in the browser tab
    // You can use emojis! 💝 💖 💗 💓 💞 💕
    pageTitle: "Will you be my valentine?💕",

    // Floating emojis that appear in the background
    // Find more emojis at: https://emojipedia.org
    floatingEmojis: {
        hearts: ['💜​', '💖', '💙​', '💜​', '💓'],  // Heart emojis
        bears: ['🧸', '🐻']                       // Cute bear emojis
    },

    // Questions and answers
    // Customize each question and its possible responses
    questions: {
        first: {
            text: "Do you like me",                                    // First interaction
            yesBtn: "Yes",                                             // Text for "Yes" button
            noBtn: "No",                                               // Text for "No" button
            secretAnswer: "More than anything"           // Secret hover message
        },
        second: {
            text: "Do you really really like me?",                          // For the love meter
            startText: "Ofcourse baby",                                   // Text before the percentage
            nextBtn: "Stop"                                         // Text for the next button
        },
        third: {
            text: "Will you be my valentine? 🌹", // The big question!
            yesBtn: "Yes!",                                             // Text for "Yes" button
            noBtn: "No"                                                 // Text for "No" button
        }
    },
    
// Love Meter Messages
loveMessages: {
    extreme: "WOOOOW You love me that much?? 🥰🚀💝",  // Shows above 5000%
    high: "To infinity and beyond! 🚀💝",              // Shows above 1000%
    normal: "And beyond! 🥰"                           // Shows above 100%
    }

    // Messages that appear after they say "Yes!"
    celebration: {
        title: "Woo Hoo! 🎉💝💖💝💓",
        emojis: "🎁💙​🤗💝💋💜​💕"  // These will bounce around
    },

    // Color scheme for the website
    // Use https://colorhunt.co or https://coolors.co to find beautiful color combinations
    colors: {
        backgroundStart: "#a294ff",      // Gradient start (try pastel colors for a soft look)
        backgroundEnd: "#7f76ff",        // Gradient end (should complement backgroundStart)
        buttonBackground: "#4d3d66",     // Button color (should stand out against the background)
        buttonHover: "#9891ff",          // Button hover color (slightly lighter than buttonBackground)
        textColor: "#9a7bcc"             // Text color (make sure it's readable!)
    },

    // Animation settings
    // Adjust these if you want faster/slower animations
    animations: {
        floatDuration: "15s",           // How long it takes hearts to float up (10-20s recommended)
        floatDistance: "50px",          // How far hearts move sideways (30-70px recommended)
        bounceSpeed: "0.5s",            // Speed of bouncing animations (0.3-0.7s recommended)
        heartExplosionSize: 1.5         // Size of heart explosion effect (1.2-2.0 recommended)
    },

 
    }
};

// Don't modify anything below this line unless you know what you're doing
window.VALENTINE_CONFIG = CONFIG; 
