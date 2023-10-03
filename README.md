![Banner](/banner.png)

---

# 🌟 Browserdesk.js 🌐

A HTML5 Windows Manager written in Javascript. Easy to integrate, easy to setup.

During my formative years, I developed a strong aversion to the constant surveillance of our computer activities within the school environment. The fact that every minute online action was being monitored bothered me. This discontentment led me to create [DuckOS](https://github.com/GikitSRC/DuckOS), an innovative Operating System designed to function entirely within a web browser. A key component of this endeavor is `browserdesk.js`, a meticulously crafted, compiled windowing system that offers seamless setup. All of this is achieved using static and pure JavaScript, free from unnecessary complexities.

---

# Installation Instructions 🚀

You can easily set up browserdesk.js by simply adding this code to before the closing body tag:

```html
<script src="https://raw.githubusercontent.com/GikitSRC/browserdesk.js/main/browserdesk.js"></script>
```

And add this anywhere before the closing </head> tag:

```html 
<link href="https://raw.githubusercontent.com/GikitSRC/browserdesk.js/main/browserdesk.css" rel="stylesheet" type="text/css" />
```
---

# User Manual 📚

### Creating a Window 🖼️
To create a new window, call the createWindow function with the title, content (HTML content for the window body), and optional width and height parameters. For example:
```javascript
createWindow('My Window', '<p>This is the content of my window.</p>', '50%', '60%');
```

### Closing, minimizing, and maximizing the window 📏
Features to close, minimize, and maximize the window is already included inside the window's header itself. There is no need to use additional Javascript to do so. 

### Bringing a Window to the Front 📌
When you interact with a window (e.g., clicking on it), it automatically comes to the front. If you need to bring a specific window to the front programmatically, you can increment its zIndex property:
```javascript
const windowTitle = 'My Window';
openedWindows[windowTitle].style.zIndex = zIndexCounter++;
```

### Resizing a Window 📐
Windows can be resized by clicking and dragging the resize handle in the bottom-right corner of the window. This feature is enabled by default.

---

## 🚫 The App Store feature of DuckOS will not be integrated inside browserdesk.js ❌

---

# Conclusion 🌐
Browserdesk.js is a great way to make a operating system like environment for users of your website. If you like my work, please consider donating!  💰🙏

**Cashapp Tag:** ``$chainedtears``
<br><br>
**PayPal Email:** ``admin@skyhax.lol``
<br><br>
**LTC Address:** ``ltc1qh7a24fehkw7clsep6gk5ejrtkv500ja5jrld7x``








