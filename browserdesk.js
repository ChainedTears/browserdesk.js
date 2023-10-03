let zIndexCounter = 1;
let isResizing = false;
let originalPosition;
const openedWindows = {};

function createWindow(title, content, width = '30%', height = '50%') {
  if (openedWindows[title]) {
    if (openedWindows[title].classList.contains('minimized')) {
      openedWindows[title].classList.remove('minimized');
      openedWindows[title].style.display = 'block'; 
    } else {
      openedWindows[title].style.zIndex = zIndexCounter++;
      openedWindows[title].classList.add('active');
    }
    return;
  }
  
  const window = document.createElement('div');
  window.className = 'window';
  window.style.zIndex = zIndexCounter++;
  window.style.width = width;
  window.style.height = height;
  openedWindows[title] = window;

  const maxWidth = parseFloat(width);
  const maxHeight = parseFloat(height);

  const remainingWidth = 100 - maxWidth;
  const remainingHeight = 100 - maxHeight;

  const calculatedLeft = remainingWidth / 2;
  const calculatedTop = remainingHeight / 2;

  window.style.left = calculatedLeft + '%';
  window.style.top = calculatedTop + '%';

  let originalLeft = calculatedLeft;
  let originalTop = calculatedTop;
  let originalWidth = width;
  let originalHeight = height;
  let originalzIndex;

  const header = document.createElement('div');
  header.className = 'window-header';
  header.textContent = title;

  const closeButton = document.createElement('button');
  closeButton.className = 'window-close-button';
  closeButton.innerHTML = '<abbr title="Close Window"></abbr>';
  closeButton.addEventListener('click', () => {
    window.classList.remove('active');
    setTimeout(() => {
      window.remove();
      delete openedWindows[title];
    }, 300);
  });

  const minimizeButton = document.createElement('button');
  minimizeButton.className = 'window-minimize-button';
  minimizeButton.textContent = '';
  minimizeButton.addEventListener('click', () => {
    if (!window.classList.contains('minimized')) {
      window.classList.add('minimized');
      window.style.display = 'none';
    } else {
      window.classList.remove('minimized');
      window.style.display = 'block';
      window.style.zIndex = zIndexCounter++;
      window.style.transform = 'scale(1)';
    }
  });

  const maximizeButton = document.createElement('button');
  maximizeButton.className = 'window-maximize-button';
  maximizeButton.textContent = '';
  maximizeButton.addEventListener('click', () => {
    if (!window.classList.contains('maximized')) {
      window.classList.add('maximized');
      originalLeft = window.style.left;
      originalTop = window.style.top;
      originalWidth = window.style.width;
      originalHeight = window.style.height;
      originalzIndex = window.style.zIndex;

      window.style.left = '0';
      window.style.top = '0';
      window.style.width = '100%';
      window.style.height = '100%';
      window.style.transform = 'none';
      window.style.zIndex = '101';
    } else {
      window.classList.remove('maximized');
      window.style.left = originalLeft;
      window.style.top = originalTop;
      window.style.width = originalWidth;
      window.style.height = originalHeight;
      window.style.zIndex = originalzIndex;
      window.style.transform = 'scale(1)';
    }
  });

  header.appendChild(closeButton);
  header.appendChild(minimizeButton);
  header.appendChild(maximizeButton);
  window.appendChild(header);

  const body = document.createElement('div');
  body.className = 'window-body';
  body.innerHTML = content;
  window.appendChild(body);

  let isDragging = false;
  let startPosX, startPosY, startMouseX, startMouseY;

  const bringToFront = () => {
    zIndexCounter += 1;
    window.style.zIndex = zIndexCounter;
  };

  const handleMouseDown = (e) => {
    if (!window.classList.contains('maximized')) {
      isDragging = true;
      startPosX = window.offsetLeft;
      startPosY = window.offsetTop;
      startMouseX = e.clientX;
      startMouseY = e.clientY;

      const iframes = window.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        iframe.style.pointerEvents = 'none';
      });

      bringToFront();

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseUp);
    }
  };

  const handleContentClick = () => {
    bringToFront();
  };

  body.addEventListener('mousedown', handleContentClick);

  const handleMouseMove = (e) => {
    if (isDragging) {
      const offsetX = e.clientX - startMouseX;
      const offsetY = e.clientY - startMouseY;
      window.style.left = startPosX + offsetX + 'px';
      window.style.top = startPosY + offsetY + 'px';
    }
  };

  const handleMouseUp = () => {
    isDragging = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mouseleave', handleMouseUp);

    const iframes = window.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      iframe.style.pointerEvents = 'auto';
    });
  };

  let isResizing = false;
  let startWidth, startHeight;

  const handleResizeMouseDown = (e) => {
    isResizing = true;
    startWidth = parseFloat(window.style.width);
    startHeight = parseFloat(window.style.height);
    startMouseX = e.clientX;
    startMouseY = e.clientY;

    const iframes = window.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      iframe.style.pointerEvents = 'none';
    });

    bringToFront();

    document.addEventListener('mousemove', handleResizeMouseMove);
    document.addEventListener('mouseup', handleResizeMouseUp);
    document.addEventListener('mouseleave', handleResizeMouseUp);
  };

  const handleResizeMouseMove = (e) => {
    if (isResizing) {
      const offsetX = e.clientX - startMouseX;
      const offsetY = e.clientY - startMouseY;
      const newWidth = Math.max(30, startWidth + offsetX);
      const newHeight = Math.max(30, startHeight + offsetY);

      window.style.width = newWidth + 'px';
      window.style.height = newHeight + 'px';
      bringToFront();
    }
  };

  const handleResizeMouseUp = () => {
    isResizing = false;
    document.removeEventListener('mousemove', handleResizeMouseMove);
    document.removeEventListener('mouseup', handleResizeMouseUp);
    document.removeEventListener('mouseleave', handleResizeMouseUp);

    const iframes = window.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      iframe.style.pointerEvents = 'auto';
    });
  };

  const resizeHandle = document.createElement('div');
  resizeHandle.className = 'resize-handle';
  resizeHandle.addEventListener('mousedown', handleResizeMouseDown);
  resizeHandle.addEventListener('mousemove', () => {
    if (isResizing) {
      bringToFront();
    }
  });
  window.appendChild(resizeHandle);

  header.addEventListener('mousedown', handleMouseDown);

  document.body.appendChild(window);

  setTimeout(() => {
    window.classList.add('active');
  }, 10);
}



const welcome = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Browserdesk</title>
    <style>
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }
        h2 {
            font-size: 35px;
            margin-bottom: 10px;
        }
        h3 {
            font-size: 20px;
            margin: 0 0 20px;
        }
        p {
            font-size: 15px;
        }
    </style>
</head>
<body>
    <h1>Browserdesk has been sucessfully installed!</h1>
    <p>This message will only show up once for new users. If you would like to remove this window, just delete the code.</p>
</body>
</html>

`

if (!localStorage.getItem('visitedBefore')) {
  createWindow('Browserdesk.js Successfully Installed!', welcome, '50%', '50%');
  localStorage.setItem('visitedBefore', 'true');
}


*/

// IT IS RECOMMENDED TO USE STYLES INSIDE THE HTML TAGS, LIKE I DID ABOVE.
