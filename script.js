
        // ====== GLOBAL DATA ======
        const vehiclesData = [
            {
                id: 1,
                name: "Honda City VX CVT",
                type: "car",
                price: "8,50,000",
                year: 2020,
                km: "25,000",
                fuel: "Petrol",
                transmission: "Automatic",
                location: "Mumbai",
                image: "Images/Honda City VX CVT.avif"
            },
            {
                id: 2,
                name: "Yamaha R15 V3",
                type: "bike",
                price: "1,85,000",
                year: 2021,
                km: "12,000",
                fuel: "Petrol",
                transmission: "Manual",
                location: "Delhi",
                image: "Images/Yamaha R15 V3.avif"
            },
            {
                id: 3,
                name: "Hyundai Creta SX",
                type: "car",
                price: "12,50,000",
                year: 2019,
                km: "35,000",
                fuel: "Diesel",
                transmission: "Automatic",
                location: "Bangalore",
                image: "Images/Hyundau Creta SX.avif"
            },
            {
                id: 4,
                name: "Royal Enfield Classic 350",
                type: "bike",
                price: "1,95,000",
                year: 2022,
                km: "8,000",
                fuel: "Petrol",
                transmission: "Manual",
                location: "Chennai",
                image: "Images/Royal Enfield Classic 350.jpg"
            },
            {
                id: 5,
                name: "Maruti Suzuki Swift",
                type: "car",
                price: "5,75,000",
                year: 2018,
                km: "40,000",
                fuel: "Petrol",
                transmission: "Manual",
                location: "Hyderabad",
                image: "Images/Maruti Suzuki Swift.avif"
                        },
            {
                id: 6,
                name: "KTM Duke 200",
                type: "bike",
                price: "1,65,000",
                year: 2020,
                km: "15,000",
                fuel: "Petrol",
                transmission: "Manual",
                location: "Pune",
                image: "Images/KTM_Duke.jpg"
                }
        ];

        // ====== DOM ELEMENTS ======
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.getElementById('menuToggle');
        const authModal = document.getElementById('authModal');
        const sellModal = document.getElementById('sellModal');
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const sellNowBtn = document.getElementById('sellNowBtn');
        const viewAllBtn = document.getElementById('viewAllBtn');
        const vehiclesGrid = document.getElementById('vehiclesGrid');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const closeModalBtns = document.querySelectorAll('.close-modal');
        const authTabs = document.querySelectorAll('.auth-tab');
        const authForms = document.querySelectorAll('.auth-form');
        const navLinks = document.querySelectorAll('.nav-link');
        const uploadZone = document.getElementById('uploadZone');
        const photoUpload = document.getElementById('photoUpload');

        // ====== INITIALIZATION ======
        document.addEventListener('DOMContentLoaded', function() {
            // Load vehicles
            renderVehicles(vehiclesData);
            
            // Setup event listeners
            setupEventListeners();
            
            // Handle scroll effects
            window.addEventListener('scroll', handleScroll);
            
            // Set active nav link
            setActiveNavLink();
        });

        // ====== RENDER FUNCTIONS ======
        function renderVehicles(vehicles) {
            vehiclesGrid.innerHTML = '';
            
            vehicles.forEach(vehicle => {
                const vehicleCard = document.createElement('div');
                vehicleCard.className = 'vehicle-card';
                vehicleCard.setAttribute('data-type', vehicle.type);
                
                vehicleCard.innerHTML = `
                    <div class="vehicle-badge">${vehicle.type === 'car' ? 'Car' : 'Bike'}</div>
                    <div class="vehicle-image">
                        <img src="${vehicle.image}" alt="${vehicle.name}">
                    </div>
                    <div class="vehicle-info">
                        <h3 class="vehicle-title">${vehicle.name}</h3>
                        <div class="vehicle-price">₹${vehicle.price}</div>
                        <div class="vehicle-details">
                            <div class="detail-item">
                                <i class="fas fa-calendar"></i>
                                <span>${vehicle.year}</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-tachometer-alt"></i>
                                <span>${vehicle.km} km</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-gas-pump"></i>
                                <span>${vehicle.fuel}</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-cog"></i>
                                <span>${vehicle.transmission}</span>
                            </div>
                        </div>
                        <div class="vehicle-actions">
                            <button class="btn btn-outline view-details" data-id="${vehicle.id}">
                                <i class="fas fa-eye"></i> View Details
                            </button>
                            <button class="btn btn-primary buy-now" data-id="${vehicle.id}">
                                <i class="fas fa-shopping-cart"></i> Buy Now
                            </button>
                        </div>
                    </div>
                `;
                
                vehiclesGrid.appendChild(vehicleCard);
            });
            
            // Add event listeners to new buttons
            document.querySelectorAll('.view-details').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    showVehicleDetails(id);
                });
            });
            
            document.querySelectorAll('.buy-now').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    buyVehicle(id);
                });
            });
        }

        // ====== EVENT HANDLERS ======
        function setupEventListeners() {
            // Mobile menu toggle
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                menuToggle.innerHTML = navMenu.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });

            // Auth modal
            loginBtn.addEventListener('click', () => openModal('authModal', 'login'));
            registerBtn.addEventListener('click', () => openModal('authModal', 'register'));

            // Sell modal
            sellNowBtn.addEventListener('click', () => openModal('sellModal'));
            viewAllBtn.addEventListener('click', () => openModal('sellModal'));

            // Close modals
            closeModalBtns.forEach(btn => {
                btn.addEventListener('click', closeAllModals);
            });

            // Click outside modal to close
            window.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal')) {
                    closeAllModals();
                }
            });

            // Auth tabs
            authTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const tabName = tab.getAttribute('data-tab');
                    switchAuthTab(tabName);
                });
            });

            // Filter buttons
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    filterVehicles(filter);
                });
            });

            // Nav links
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remove active class from all links
                    navLinks.forEach(l => l.classList.remove('active'));
                    // Add active class to clicked link
                    this.classList.add('active');
                    
                    // Close mobile menu
                    navMenu.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    
                    // Scroll to section
                    const targetId = this.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Form submissions
            document.getElementById('loginFormData').addEventListener('submit', handleLogin);
            document.getElementById('registerFormData').addEventListener('submit', handleRegister);
            document.getElementById('sellVehicleForm').addEventListener('submit', handleSellVehicle);
            document.getElementById('contactForm').addEventListener('submit', handleContact);

            // Photo upload
            uploadZone.addEventListener('click', () => photoUpload.click());
            uploadZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadZone.style.borderColor = 'var(--primary)';
                uploadZone.style.background = 'rgba(255, 77, 0, 0.05)';
            });
            uploadZone.addEventListener('dragleave', () => {
                uploadZone.style.borderColor = 'var(--light-gray)';
                uploadZone.style.background = 'white';
            });
            uploadZone.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadZone.style.borderColor = 'var(--light-gray)';
                uploadZone.style.background = 'white';
                handleImageUpload(e.dataTransfer.files);
            });
            photoUpload.addEventListener('change', (e) => handleImageUpload(e.target.files));
        }

        function handleScroll() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        function setActiveNavLink() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (scrollY >= (sectionTop - 150)) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === current) {
                        link.classList.add('active');
                    }
                });
            });
        }

        // ====== MODAL FUNCTIONS ======
        function openModal(modalId, tab = 'login') {
            const modal = document.getElementById(modalId);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            if (modalId === 'authModal') {
                switchAuthTab(tab);
            }
        }

        function closeAllModals() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        }

        function switchAuthTab(tabName) {
            // Update tabs
            authTabs.forEach(tab => {
                tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
            });
            
            // Update forms
            authForms.forEach(form => {
                form.classList.toggle('active', form.id === `${tabName}Form`);
            });
        }

        // ====== VEHICLE FUNCTIONS ======
        function filterVehicles(filter) {
            let filteredVehicles;
            
            if (filter === 'all') {
                filteredVehicles = vehiclesData;
            } else if (filter === 'car') {
                filteredVehicles = vehiclesData.filter(v => v.type === 'car');
            } else if (filter === 'bike') {
                filteredVehicles = vehiclesData.filter(v => v.type === 'bike');
            } else if (filter === 'luxury') {
                filteredVehicles = vehiclesData.filter(v => v.price.includes(',') && parseInt(v.price.replace(/,/g, '')) > 1000000);
            }
            
            renderVehicles(filteredVehicles);
        }

        function showVehicleDetails(id) {
            const vehicle = vehiclesData.find(v => v.id == id);
            if (vehicle) {
                alert(`Vehicle Details:\n\nName: ${vehicle.name}\nPrice: ₹${vehicle.price}\nYear: ${vehicle.year}\nKilometers: ${vehicle.km}\nFuel: ${vehicle.fuel}\nTransmission: ${vehicle.transmission}\nLocation: ${vehicle.location}`);
            }
        }

        function buyVehicle(id) {
            const vehicle = vehiclesData.find(v => v.id == id);
            if (vehicle) {
                const proceed = confirm(`Buy ${vehicle.name} for ₹${vehicle.price}?\n\nClick OK to proceed to checkout.`);
                if (proceed) {
                    alert('Redirecting to checkout page...\n\nNote: This is a demo. In a real application, you would be redirected to the payment gateway.');
                }
            }
        }

        // ====== FORM HANDLERS ======
        function handleLogin(e) {
            e.preventDefault();
            alert('Login successful! Welcome to AutoBazaar.');
            closeAllModals();
        }

        function handleRegister(e) {
            e.preventDefault();
            alert('Registration successful! Welcome to AutoBazaar community.');
            closeAllModals();
        }

        function handleSellVehicle(e) {
            e.preventDefault();
            
            const photoPreview = document.getElementById('photoPreview');
            const uploadedPhotos = photoPreview.querySelectorAll('img').length;
            
            if (uploadedPhotos < 5) {
                alert('Please upload at least 5 photos of your vehicle.');
                return;
            }
            
            alert('Your vehicle has been listed successfully!\n\nOur team will contact you within 24 hours for vehicle inspection.');
            closeAllModals();
            
            // Reset form
            e.target.reset();
            photoPreview.innerHTML = '';
        }

        function handleContact(e) {
            e.preventDefault();
            alert('Thank you for your message! We will contact you within 24 hours.');
            e.target.reset();
        }

        function handleImageUpload(files) {
            const photoPreview = document.getElementById('photoPreview');
            
            Array.from(files).forEach((file, index) => {
                if (photoPreview.querySelectorAll('img').length >= 10) {
                    alert('Maximum 10 photos allowed.');
                    return;
                }
                
                if (!file.type.startsWith('image/')) {
                    alert('Please upload only image files.');
                    return;
                }
                
                if (file.size > 5 * 1024 * 1024) {
                    alert('File size should be less than 5MB.');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.width = '100px';
                    img.style.height = '100px';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = 'var(--radius-sm)';
                    img.style.margin = '5px';
                    img.style.border = '2px solid var(--light-gray)';
                    
                    const container = document.createElement('div');
                    container.style.position = 'relative';
                    container.style.display = 'inline-block';
                    container.appendChild(img);
                    
                    const removeBtn = document.createElement('button');
                    removeBtn.innerHTML = '×';
                    removeBtn.style.position = 'absolute';
                    removeBtn.style.top = '0';
                    removeBtn.style.right = '0';
                    removeBtn.style.background = 'var(--danger)';
                    removeBtn.style.color = 'white';
                    removeBtn.style.border = 'none';
                    removeBtn.style.borderRadius = '50%';
                    removeBtn.style.width = '20px';
                    removeBtn.style.height = '20px';
                    removeBtn.style.cursor = 'pointer';
                    removeBtn.style.fontSize = '12px';
                    removeBtn.addEventListener('click', function() {
                        container.remove();
                    });
                    
                    container.appendChild(removeBtn);
                    photoPreview.appendChild(container);
                };
                reader.readAsDataURL(file);
            });
            
            photoUpload.value = '';
        }

        // ====== KEYBOARD SHORTCUTS ======
        document.addEventListener('keydown', (e) => {
            // Escape to close modals
            if (e.key === 'Escape') {
                closeAllModals();
            }
            
            // Ctrl + / for search focus
            if (e.ctrlKey && e.key === '/') {
                e.preventDefault();
                document.querySelector('.search-input').focus();
            }
        });

        // ====== DEMO DATA GENERATOR ======
        function generateDemoData() {
            // Already have demo data
            console.log('AutoBazaar Demo Loaded');
            console.log('Try:');
            console.log('- Click on vehicles to view details');
            console.log('- Use filter buttons to filter vehicles');
            console.log('- Click Buy/Sell buttons');
            console.log('- Submit forms');
            console.log('- Try mobile responsive view');
        }

        // Initialize demo
        generateDemoData();