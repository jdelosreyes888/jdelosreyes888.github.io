let currentCategory = '';
let selectedFiles = [];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadPicturesFromStorage();
    updateEmptyStates();
});

function openUploadModal(category) {
    currentCategory = category;
    const modal = document.getElementById('uploadModal');
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('preview-container');
    
    // Reset modal state
    fileInput.value = '';
    selectedFiles = [];
    previewContainer.innerHTML = '';
    
    modal.style.display = 'block';
}

function closeUploadModal() {
    const modal = document.getElementById('uploadModal');
    modal.style.display = 'none';
    currentCategory = '';
    selectedFiles = [];
}

function handleFileSelect(event) {
    const files = event.target.files;
    const previewContainer = document.getElementById('preview-container');
    
    selectedFiles = Array.from(files);
    previewContainer.innerHTML = '';
    
    selectedFiles.forEach((file, index) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="Preview ${index + 1}">
                `;
                previewContainer.appendChild(previewItem);
            };
            
            reader.readAsDataURL(file);
        }
    });
}

function uploadPictures() {
    if (selectedFiles.length === 0) {
        alert('Please select at least one image file.');
        return;
    }
    
    const grid = document.getElementById(`${currentCategory}-grid`);
    
    selectedFiles.forEach((file, index) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const pictureItem = createPictureItem(e.target.result, index);
                grid.appendChild(pictureItem);
                
                // Save to localStorage
                savePictureToStorage(currentCategory, e.target.result);
                
                // Update empty state
                updateEmptyState(currentCategory);
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    closeUploadModal();
}

function createPictureItem(imageSrc, index) {
    const pictureItem = document.createElement('div');
    pictureItem.className = 'picture-item';
    pictureItem.innerHTML = `
        <img src="${imageSrc}" alt="Picture ${index + 1}">
        <button class="delete-btn" onclick="deletePicture(this, '${currentCategory}')">×</button>
    `;
    return pictureItem;
}

function deletePicture(button, category) {
    const pictureItem = button.parentElement;
    const img = pictureItem.querySelector('img');
    const imageSrc = img.src;
    
    // Remove from DOM
    pictureItem.remove();
    
    // Remove from localStorage
    removePictureFromStorage(category, imageSrc);
    
    // Update empty state
    updateEmptyState(category);
}

function savePictureToStorage(category, imageSrc) {
    const storageKey = `pictures_${category}`;
    let pictures = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    // Check if image already exists
    if (!pictures.includes(imageSrc)) {
        pictures.push(imageSrc);
        localStorage.setItem(storageKey, JSON.stringify(pictures));
    }
}

function removePictureFromStorage(category, imageSrc) {
    const storageKey = `pictures_${category}`;
    let pictures = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    pictures = pictures.filter(pic => pic !== imageSrc);
    localStorage.setItem(storageKey, JSON.stringify(pictures));
}

function loadPicturesFromStorage() {
    const categories = ['travel', 'food', 'nature'];
    
    categories.forEach(category => {
        const storageKey = `pictures_${category}`;
        const pictures = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const grid = document.getElementById(`${category}-grid`);
        
        pictures.forEach((imageSrc, index) => {
            const pictureItem = createPictureItem(imageSrc, index);
            grid.appendChild(pictureItem);
        });
    });
}

function updateEmptyStates() {
    const categories = ['travel', 'food', 'nature'];
    
    categories.forEach(category => {
        updateEmptyState(category);
    });
}

function updateEmptyState(category) {
    const grid = document.getElementById(`${category}-grid`);
    const pictures = grid.querySelectorAll('.picture-item');
    
    // Remove existing empty state message
    const existingEmptyState = grid.querySelector('.empty-state');
    if (existingEmptyState) {
        existingEmptyState.remove();
    }
    
    // Add empty state message if no pictures
    if (pictures.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.textContent = 'No pictures yet. Click "Add Pictures" to get started!';
        grid.appendChild(emptyState);
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('uploadModal');
    if (event.target === modal) {
        closeUploadModal();
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeUploadModal();
    }
});
