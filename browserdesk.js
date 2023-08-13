let zIndexCounter = 1;


function createWindow(title, content) {
  const window = document.createElement('div');
  window.className = 'window';
  window.style.zIndex = zIndexCounter++;
  const initialLeft = Math.max(0, (window.innerWidth - 400) / 2);
  const initialTop = Math.max(0, (window.innerHeight - 300) / 2);

  window.style.left = initialLeft + 'px';
  window.style.top = initialTop + 'px';

  let originalLeft = initialLeft;
  let originalTop = initialTop;
  let originalWidth = '400px';
  let originalHeight = '300px';

  const header = document.createElement('div');
  header.className = 'window-header';
  header.textContent = title;

  const bringToFrontButton = document.createElement('button');
bringToFrontButton.className = 'window-front-button';
bringToFrontButton.textContent = '';
bringToFrontButton.addEventListener('click', (e) => {
  if (!window.classList.contains('maximized') && e.clientX < maximizeButton.getBoundingClientRect().left) {
    bringToFront();
  }
});

header.appendChild(bringToFrontButton);  

  const closeButton = document.createElement('button');
  closeButton.className = 'window-close-button';
  closeButton.textContent = '';
  closeButton.addEventListener('click', () => {
    window.classList.remove('active');
    setTimeout(() => {
      window.remove();
    }, 300);
  });


  const minimizeButton = document.createElement('button');
  minimizeButton.className = 'window-minimize-button';
  minimizeButton.textContent = '';
  minimizeButton.addEventListener('click', () => {
    if (window.classList.contains('minimized')) {
      window.classList.remove('minimized');
    } else {
      window.classList.add('minimized');
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

      window.style.left = '0';
      window.style.top = '0';
      window.style.width = '100%';
      window.style.height = '100%';
      window.style.transform = 'none';
    } else {
      window.classList.remove('maximized');
      window.style.left = originalLeft;
      window.style.top = originalTop;
      window.style.width = originalWidth;
      window.style.height = originalHeight;
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
    window.style.zIndex = zIndexCounter++;
  };


  header.addEventListener('mousedown', (e) => {
    if (!window.classList.contains('maximized')) {
      isDragging = true;
      startPosX = window.offsetLeft;
      startPosY = window.offsetTop;
      startMouseX = e.clientX;
      startMouseY = e.clientY;

      bringToFront();
    }
  });

  body.addEventListener('mousedown', () => {
    bringToFront();
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const offsetX = e.clientX - startMouseX;
      const offsetY = e.clientY - startMouseY;
      window.style.left = startPosX + offsetX + 'px';
      window.style.top = startPosY + offsetY + 'px';
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
  document.addEventListener('mouseleave', () => {
    isDragging = false;
  });

  document.body.appendChild(window);
  setTimeout(() => {
    window.classList.add('active');
  }, 10);
}
