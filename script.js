// Modern Real Estate Website - Enhanced JavaScript
// Performance optimized with modern ES6+ features

// DOM Elements - Cached for performance
const elements = {
  navbar: document.querySelector(".navbar"),
  hamburger: document.querySelector(".hamburger"),
  navMenu: document.querySelector(".nav-menu"),
  navLinks: document.querySelectorAll(".nav-link"),
  themeToggle: document.querySelector(".theme-toggle"),
  adminAccessBtn: document.getElementById("adminAccessBtn"),
  adminModal: document.getElementById("adminModal"),
  addPropertyModal: document.getElementById("addPropertyModal"),
  closeButtons: document.querySelectorAll(".close"),
  tabButtons: document.querySelectorAll(".tab-btn"),
  tabContents: document.querySelectorAll(".tab-content"),
  addPropertyBtn: document.getElementById("addPropertyBtn"),
  addPropertyForm: document.getElementById("addPropertyForm"),
  cancelAddProperty: document.getElementById("cancelAddProperty"),
  contactForm: document.getElementById("contactForm"),
  searchInput: document.getElementById("searchInput"),
  searchBtn: document.getElementById("searchBtn"),
  propertyTypeFilter: document.getElementById("propertyType"),
  propertyStatusFilter: document.getElementById("propertyStatus"),
  priceRangeFilter: document.getElementById("priceRange"),
  propertiesGrid: document.getElementById("propertiesGrid"),
  adminPropertiesList: document.getElementById("adminPropertiesList"),
  adminInquiriesList: document.getElementById("adminInquiriesList"),
};

// Enhanced Properties Data
let properties = [
  {
    id: 1,
    title: "Modern 4-Bedroom Bungalow",
    description:
      "Luxurious 4-bedroom bungalow facing tarred road with excellent proximity to major places in GRA. Document: C of O.",
    location: "GRA, Ilorin, Kwara State",
    price: "₦280M",
    type: "house",
    status: "sale",
    beds: 4,
    baths: 3,
    size: "7 Plots",
    image: "bedroom.jpg",
    features: ["4 Beds", "3 Baths", "7 Plots"],
    amenities: ["C of O", "Tarred Road", "GRA Location"],
    yearBuilt: 2023,
    area: "GRA",
  },
  {
    id: 2,
    title: "Modern 5 Bedroom Home",
    description:
      "Last 85m, reason is this it comes with all 10 AC, the 27kv generator and the car porch. Total land is 4 plots, main house has 5 bedrooms, joined BQ has 2 bedrooms. It has C of O.",
    location: "Along Airport road, Ilorin, Kwara state",
    price: "₦100M",
    type: "house",
    status: "sale",
    beds: 5,
    baths: 4,
    size: "4 Plots",
    image: "servicess.jpg",
    features: ["5 Beds", "4 Plots", "10 AC", "27kv Generator"],
    amenities: ["C of O", "Car Porch", "BQ"],
    yearBuilt: 2022,
    area: "Airport Road",
  },
  {
    id: 3,
    title: "Investment Land Package",
    description:
      "This land is located near kanbi olorobo estate, Ilorin. It is a good land for investment, estate and farming activities",
    location: "Mandate Market Area, Ilorin",
    price: "₦3M",
    type: "land",
    status: "sale",
    beds: 0,
    baths: 0,
    size: "1 Plot",
    image: "landd.jpg",
    features: ["Estate Ready", "Farming Activities", "Secure"],
    amenities: ["Investment Ready", "Estate Development"],
    yearBuilt: null,
    area: "Mandate Market",
  },
  {
    id: 4,
    title: "4-Bedroom Bungalow",
    description:
      "4-bedroom bungalow on 2 plots, divided into 2-bedroom flat and room & parlor. POP ceiling, fenced with gate. Close to main road. Document: C of O.",
    location: "Power Line, Irewolede, Ilorin, Kwara State",
    price: "₦40M",
    type: "house",
    status: "sale",
    beds: 4,
    baths: 3,
    size: "2 Plots",
    image: "newprop.jpeg",
    features: ["4 Beds", "3 Baths", "2 Plots"],
    amenities: [
      "C of O",
      "POP Ceiling",
      "Fenced with Gate",
      "Close to Main Road",
    ],
    yearBuilt: null,
    area: "Irewolede",
  },
  {
    id: 5,
    title: "Modern Home for Sale",
    description:
      "Modern Duplex and solid structure with high commercial structures, located at tanke area.",
    location: "University Road, tanke garage area",
    price: "₦40M",
    type: "house",
    status: "sale",
    beds: 3,
    baths: 2,
    size: "1 Plot",
    image: "property.jpg",
    features: ["Duplex", "Balcony", "Commercial"],
    amenities: ["Solid Structure", "High Commercial Value"],
    yearBuilt: 2020,
    area: "Tanke",
  },
  {
    id: 6,
    title: "Two Story Buildings",
    description: "Two storey buildings, each 4 spacious flats and each 100M.",
    location: "Sawmill road, Ilorin",
    price: "₦100M",
    type: "house",
    status: "sale",
    plots: "3 each",
    flats: "4 each",
    size: "5 Plots",
    image: "prop.jpg",
    features: ["3 Plots each", "2 Story Building", "4 flats each"],
    amenities: ["Multiple Plots", "Genuine documents", "Near Road"],
    yearBuilt: 2018,
    area: "Sawmill",
  },
];

// Sample Inquiries Data
let inquiries = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "08012345678",
    type: "Property Viewing",
    message: "I'm interested in viewing the 4-bedroom bungalow in GRA.",
    date: "2025-09-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "08087654321",
    type: "Investment Advice",
    message: "I need advice on real estate investment opportunities in Ilorin.",
    date: "2025-09-14",
  },
];

// Utility Functions
const utils = {
  // Debounce function for performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Format price for display
  formatPrice(price) {
    if (typeof price === "string") {
      return price;
    }
    return `₦${price.toLocaleString()}`;
  },

  // Generate unique ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // Validate email
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Validate phone number (Nigerian format)
  validatePhone(phone) {
    const re = /^(\+234|0)?[789][01]\d{8}$/;
    return re.test(phone.replace(/\s/g, ""));
  },

  // Sanitize input
  sanitizeInput(input) {
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  },
};

// Enhanced Notifications System
const notifications = {
  show(message, type = "info", duration = 5000) {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.setAttribute("role", "alert");
    notification.setAttribute("aria-live", "polite");

    const icon = this.getIcon(type);

    notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">${icon}</div>
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getBackgroundColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
            border-left: 4px solid ${this.getBorderColor(type)};
        `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Close button functionality
    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => {
      this.close(notification);
    });

    // Auto remove
    setTimeout(() => {
      this.close(notification);
    }, duration);
  },

  getIcon(type) {
    const icons = {
      success: "✓",
      error: "✕",
      warning: "⚠",
      info: "ℹ",
    };
    return icons[type] || icons.info;
  },

  getBackgroundColor(type) {
    const colors = {
      success: "#10b981",
      error: "#ef4444",
      warning: "#f59e0b",
      info: "#3b82f6",
    };
    return colors[type] || colors.info;
  },

  getBorderColor(type) {
    const colors = {
      success: "#059669",
      error: "#dc2626",
      warning: "#d97706",
      info: "#2563eb",
    };
    return colors[type] || colors.info;
  },

  close(notification) {
    if (document.body.contains(notification)) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  },
};

// Theme Management
const themeManager = {
  init() {
    this.loadTheme();
    this.setupThemeToggle();
    this.setupSystemThemeDetection();
  },

  loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const theme = savedTheme || systemTheme;

    document.documentElement.setAttribute("data-theme", theme);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);

    this.updateThemeIcon(theme);
    this.updateLogo(theme);
  },

  setupThemeToggle() {
    if (elements.themeToggle) {
      elements.themeToggle.addEventListener("click", () => {
        this.toggleTheme();
      });
    }
  },

  setupSystemThemeDetection() {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          const theme = e.matches ? "dark" : "light";
          document.documentElement.setAttribute("data-theme", theme);
          this.updateThemeIcon(theme);
        }
      });
  },

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    this.updateThemeIcon(newTheme);
    this.updateLogo(newTheme);

    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);

    // Add transition effect
    document.body.style.transition =
      "background-color 0.35s ease, color 0.35s ease";
    setTimeout(() => {
      document.body.style.transition = "";
    }, 400);
  },

  updateThemeIcon(theme) {
    if (elements.themeToggle) {
      const icon = elements.themeToggle.querySelector("i");
      if (icon) {
        icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
      }
    }
  },
};

// Swap logo image based on theme
themeManager.updateLogo = function (theme) {
  const logo = document.getElementById("siteLogo");
  if (!logo) return;
  const lightSrc = logo.getAttribute("data-light-src");
  const darkSrc = logo.getAttribute("data-dark-src");
  logo.src = theme === "dark" ? darkSrc || logo.src : lightSrc || logo.src;
  logo.decoding = "async";
};

// Enhanced Search with Suggestions
const searchManager = {
  init() {
    this.setupSearchSuggestions();
    this.setupAdvancedSearch();
  },

  setupSearchSuggestions() {
    if (!elements.searchInput) return;

    const suggestions = [
      "GRA Ilorin",
      "Airport Road",
      "Tanke",
      "Enyekorin",
      "Sawmill",
      "Mandate Market",
      "Oke-Oyi",
      "Power Line",
      "Irewolede",
      "4 Bedroom",
      "5 Bedroom",
      "4 Plot",
      "5 Plot",
      "3 Plot",
      "2 Plot",
      "1 Plot",
      "4 Flat",
      "Story Building",
      "Duplex",
      "Bungalow",
      "Land",
      "Investment",
      "Commercial",
    ];

    elements.searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      if (value.length > 1) {
        this.showSuggestions(
          suggestions.filter((s) => s.toLowerCase().includes(value))
        );
      } else {
        this.hideSuggestions();
      }
    });

    // Hide suggestions when clicking outside
    document.addEventListener("click", (e) => {
      if (!elements.searchInput.contains(e.target)) {
        this.hideSuggestions();
      }
    });
  },

  showSuggestions(suggestions) {
    this.hideSuggestions();

    if (suggestions.length === 0) return;

    const container = document.createElement("div");
    container.className = "search-suggestions";
    container.innerHTML = suggestions
      .map(
        (suggestion) =>
          `<div class="suggestion-item" data-suggestion="${suggestion}">${suggestion}</div>`
      )
      .join("");

    elements.searchInput.parentNode.appendChild(container);

    // Add click handlers
    container.querySelectorAll(".suggestion-item").forEach((item) => {
      item.addEventListener("click", () => {
        elements.searchInput.value = item.dataset.suggestion;
        this.hideSuggestions();
        if (typeof filterProperties === "function") {
          filterProperties();
        }
      });
    });
  },

  hideSuggestions() {
    const existing = document.querySelector(".search-suggestions");
    if (existing) {
      existing.remove();
    }
  },

  setupAdvancedSearch() {
    // Add keyboard navigation for suggestions
    if (elements.searchInput) {
      elements.searchInput.addEventListener("keydown", (e) => {
        const suggestions = document.querySelectorAll(".suggestion-item");
        if (suggestions.length === 0) return;

        const current = document.querySelector(".suggestion-item.active");
        let index = current ? Array.from(suggestions).indexOf(current) : -1;

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            index = Math.min(index + 1, suggestions.length - 1);
            this.highlightSuggestion(suggestions[index]);
            break;
          case "ArrowUp":
            e.preventDefault();
            index = Math.max(index - 1, 0);
            this.highlightSuggestion(suggestions[index]);
            break;
          case "Enter":
            if (current) {
              e.preventDefault();
              elements.searchInput.value = current.dataset.suggestion;
              this.hideSuggestions();
            }
            break;
          case "Escape":
            this.hideSuggestions();
            break;
        }
      });
    }
  },

  highlightSuggestion(suggestion) {
    document.querySelectorAll(".suggestion-item").forEach((item) => {
      item.classList.remove("active");
    });
    if (suggestion) {
      suggestion.classList.add("active");
    }
  },
};

// Enhanced Image Loading with Error Handling
const imageManager = {
  init() {
    this.setupLazyLoading();
    this.setupErrorHandling();
  },

  setupLazyLoading() {
    const images = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        });
      },
      {
        rootMargin: "50px 0px",
        threshold: 0.01,
      }
    );

    images.forEach((img) => imageObserver.observe(img));
  },

  setupErrorHandling() {
    document.addEventListener(
      "error",
      (e) => {
        if (e.target.tagName === "IMG") {
          e.target.src = "background.jpg"; // Fallback image
          e.target.alt = "Property image not available";
        }
      },
      true
    );
  },
};

// Initialize Application
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all modules
  themeManager.init();
  navigation.init();
  searchManager.init();
  imageManager.init();
  adminPanel.init();
  initializeSearchAndFilter();

  // Load initial data
  if (typeof loadProperties === "function") {
    loadProperties();
  }

  // Show welcome message
  setTimeout(() => {
    notifications.show("WELCOME TO THE NEXTPHASE!", "info", 3000);
  }, 1000);
});

// Enhanced Navigation
const navigation = {
  init() {
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupNavbarScroll();
    this.setupKeyboardNavigation();
  },

  setupMobileMenu() {
    if (!elements.hamburger || !elements.navMenu) return;

    elements.hamburger.addEventListener("click", () => {
      const isExpanded = elements.navMenu.classList.contains("active");
      elements.navMenu.classList.toggle("active");
      elements.hamburger.classList.toggle("active");
      elements.hamburger.setAttribute("aria-expanded", !isExpanded);

      // Prevent body scroll when menu is open
      document.body.style.overflow = !isExpanded ? "hidden" : "";
    });

    // Close menu when clicking on links
    elements.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        elements.navMenu.classList.remove("active");
        elements.hamburger.classList.remove("active");
        elements.hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !elements.navMenu.contains(e.target) &&
        !elements.hamburger.contains(e.target)
      ) {
        elements.navMenu.classList.remove("active");
        elements.hamburger.classList.remove("active");
        elements.hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  },

  setupSmoothScrolling() {
    elements.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });

          // Update active nav link
          this.updateActiveNavLink(link);
        }
      });
    });
  },

  updateActiveNavLink(activeLink) {
    elements.navLinks.forEach((link) => {
      link.setAttribute("aria-current", "false");
      link.classList.remove("active");
    });
    activeLink.setAttribute("aria-current", "page");
    activeLink.classList.add("active");
  },

  setupNavbarScroll() {
    let lastScrollY = window.scrollY;

    window.addEventListener(
      "scroll",
      utils.debounce(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
          elements.navbar.style.background = "rgba(15, 23, 42, 0.98)";
          elements.navbar.style.backdropFilter = "blur(20px)";
        } else {
          elements.navbar.style.background = "rgba(15, 23, 42, 0.95)";
          elements.navbar.style.backdropFilter = "blur(20px)";
        }

        lastScrollY = currentScrollY;
      }, 10)
    );
  },

  setupKeyboardNavigation() {
    // ESC key to close mobile menu
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        elements.navMenu.classList.remove("active");
        elements.hamburger.classList.remove("active");
        elements.hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  },
};

// Enhanced Admin Panel
const adminPanel = {
  init() {
    this.setupAdminAccess();
    this.setupModalHandlers();
    this.setupTabSwitching();
    this.setupPropertyManagement();
  },

  setupAdminAccess() {
    if (elements.adminAccessBtn) {
      elements.adminAccessBtn.addEventListener("click", () => {
        this.showAdminModal();
      });
    }
  },

  showAdminModal() {
    if (elements.adminModal) {
      elements.adminModal.style.display = "block";
      this.loadAdminData();
      // Add animation
      elements.adminModal.style.opacity = "0";
      elements.adminModal.style.transform = "scale(0.9)";
      setTimeout(() => {
        elements.adminModal.style.opacity = "1";
        elements.adminModal.style.transform = "scale(1)";
      }, 10);
    }
  },

  setupModalHandlers() {
    // Close modals
    elements.closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.closeModals();
      });
    });

    // Close modals when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === elements.adminModal) {
        this.closeModals();
      }
      if (e.target === elements.addPropertyModal) {
        elements.addPropertyModal.style.display = "none";
      }
    });

    // ESC key to close modals
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeModals();
      }
    });
  },

  closeModals() {
    if (elements.adminModal) {
      elements.adminModal.style.opacity = "0";
      elements.adminModal.style.transform = "scale(0.9)";
      setTimeout(() => {
        elements.adminModal.style.display = "none";
      }, 300);
    }
    if (elements.addPropertyModal) {
      elements.addPropertyModal.style.display = "none";
    }
  },

  setupTabSwitching() {
    elements.tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetTab = button.getAttribute("data-tab");
        this.switchTab(targetTab);
      });
    });
  },

  switchTab(tabName) {
    // Update active tab button
    elements.tabButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
    });

    const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeButton) {
      activeButton.classList.add("active");
      activeButton.setAttribute("aria-selected", "true");
    }

    // Update active tab content
    elements.tabContents.forEach((content) => {
      content.classList.remove("active");
      content.setAttribute("aria-hidden", "true");
    });

    const activeContent = document.getElementById(tabName + "Tab");
    if (activeContent) {
      activeContent.classList.add("active");
      activeContent.setAttribute("aria-hidden", "false");
    }
  },

  setupPropertyManagement() {
    if (elements.addPropertyBtn) {
      elements.addPropertyBtn.addEventListener("click", () => {
        if (elements.addPropertyModal) {
          elements.addPropertyModal.style.display = "block";
        }
      });
    }

    if (elements.cancelAddProperty) {
      elements.cancelAddProperty.addEventListener("click", () => {
        if (elements.addPropertyModal) {
          elements.addPropertyModal.style.display = "none";
        }
      });
    }

    if (elements.addPropertyForm) {
      elements.addPropertyForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.addNewProperty();
      });
    }
  },

  loadAdminData() {
    this.loadAdminProperties();
    this.loadAdminInquiries();
  },

  loadAdminProperties() {
    if (!elements.adminPropertiesList) return;

    elements.adminPropertiesList.innerHTML = "";

    properties.forEach((property) => {
      const propertyItem = document.createElement("div");
      propertyItem.className = "admin-property-item";
      propertyItem.innerHTML = `
                <div class="property-info">
                    <h4>${property.title}</h4>
                    <p><strong>Location:</strong> ${property.location}</p>
                    <p><strong>Price:</strong> ${property.price}</p>
                    <p><strong>Type:</strong> ${property.type}</p>
                    <p><strong>Status:</strong> ${property.status}</p>
                </div>
                <div class="property-actions">
                    <button class="btn btn-secondary btn-sm" onclick="adminPanel.editProperty(${property.id})" aria-label="Edit ${property.title}">
                        Edit
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="adminPanel.deleteProperty(${property.id})" aria-label="Delete ${property.title}">
                        Delete
                    </button>
                </div>
            `;
      elements.adminPropertiesList.appendChild(propertyItem);
    });
  },

  loadAdminInquiries() {
    if (!elements.adminInquiriesList) return;

    elements.adminInquiriesList.innerHTML = "";

    inquiries.forEach((inquiry) => {
      const inquiryItem = document.createElement("div");
      inquiryItem.className = "admin-inquiry-item";
      inquiryItem.innerHTML = `
                <div class="inquiry-info">
                    <h4>${inquiry.name}</h4>
                    <p><strong>Email:</strong> <a href="mailto:${inquiry.email}">${inquiry.email}</a></p>
                    <p><strong>Phone:</strong> <a href="tel:${inquiry.phone}">${inquiry.phone}</a></p>
                    <p><strong>Type:</strong> ${inquiry.type}</p>
                    <p><strong>Message:</strong> ${inquiry.message}</p>
                    <p><strong>Date:</strong> ${inquiry.date}</p>
                    <p><strong>Status:</strong> <span class="status-${inquiry.status}">${inquiry.status}</span></p>
                </div>
                <div class="inquiry-actions">
                    <button class="btn btn-secondary btn-sm" onclick="adminPanel.markInquiryAsContacted(${inquiry.id})">
                        Mark as Contacted
                    </button>
                </div>
            `;
      elements.adminInquiriesList.appendChild(inquiryItem);
    });
  },

  addNewProperty() {
    const formData = new FormData(elements.addPropertyForm);
    const newProperty = {
      id: properties.length + 1,
      title: utils.sanitizeInput(formData.get("title")),
      description: utils.sanitizeInput(formData.get("description")),
      location: utils.sanitizeInput(formData.get("location")),
      price: utils.sanitizeInput(formData.get("price")),
      type: formData.get("type"),
      status: formData.get("status"),
      beds: parseInt(formData.get("beds")) || 0,
      baths: parseInt(formData.get("baths")) || 0,
      size: utils.sanitizeInput(formData.get("size")),
      image: "background.jpg", // Default image
      features: [],
      amenities: [],
      yearBuilt: null,
      area: utils.sanitizeInput(formData.get("location")).split(",")[0],
    };

    // Add features based on property type
    if (newProperty.beds > 0)
      newProperty.features.push(`${newProperty.beds} Beds`);
    if (newProperty.baths > 0)
      newProperty.features.push(`${newProperty.baths} Baths`);
    if (newProperty.size) newProperty.features.push(newProperty.size);

    properties.push(newProperty);

    // Reload properties
    if (typeof searchFilter !== "undefined" && searchFilter.displayProperties) {
      searchFilter.displayProperties(properties);
    }
    this.loadAdminProperties();

    // Close modal and reset form
    elements.addPropertyModal.style.display = "none";
    elements.addPropertyForm.reset();

    // Show success message
    notifications.show("Property added successfully!", "success");
  },

  editProperty(id) {
    notifications.show("Edit functionality coming soon!", "info");
  },

  deleteProperty(id) {
    if (confirm("Are you sure you want to delete this property?")) {
      properties = properties.filter((property) => property.id !== id);
      if (
        typeof searchFilter !== "undefined" &&
        searchFilter.displayProperties
      ) {
        searchFilter.displayProperties(properties);
      }
      this.loadAdminProperties();
      notifications.show("Property deleted successfully!", "success");
    }
  },

  markInquiryAsContacted(id) {
    const inquiry = inquiries.find((i) => i.id === id);
    if (inquiry) {
      inquiry.status = "contacted";
      this.loadAdminInquiries();
      notifications.show("Inquiry marked as contacted!", "success");
    }
  },
};

// Legacy functions removed - functionality moved to adminPanel module

// Search and Filter functionality
function initializeSearchAndFilter() {
  if (!elements.searchInput || !elements.searchBtn) return;

  // Search functionality
  elements.searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    filterProperties();
  });
  elements.searchInput.addEventListener(
    "input",
    utils.debounce(filterProperties, 200)
  );

  // Filter functionality
  if (elements.propertyTypeFilter) {
    elements.propertyTypeFilter.addEventListener("change", filterProperties);
  }
  if (elements.propertyStatusFilter) {
    elements.propertyStatusFilter.addEventListener("change", filterProperties);
  }
  if (elements.priceRangeFilter) {
    elements.priceRangeFilter.addEventListener("change", filterProperties);
  }
}

// Filter properties based on search and filters
function filterProperties() {
  const searchTerm = (elements.searchInput?.value || "").toLowerCase();
  const typeFilter = elements.propertyTypeFilter?.value || "";
  const statusFilter = elements.propertyStatusFilter?.value || "";
  const priceFilter = elements.priceRangeFilter?.value || "";

  const filteredProperties = properties.filter((property) => {
    // Search term filter
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm) ||
      property.description.toLowerCase().includes(searchTerm) ||
      property.location.toLowerCase().includes(searchTerm) ||
      (property.features &&
        property.features.some((f) => f.toLowerCase().includes(searchTerm))) ||
      (property.amenities &&
        property.amenities.some((a) => a.toLowerCase().includes(searchTerm))) ||
      (property.area && property.area.toLowerCase().includes(searchTerm));

    // Type filter
    const matchesType = !typeFilter || property.type === typeFilter;

    // Status filter
    const matchesStatus = !statusFilter || property.status === statusFilter;

    // Price filter
    let matchesPrice = true;
    if (priceFilter) {
      const price = parseFloat(property.price.replace(/[^\d.]/g, ""));
      switch (priceFilter) {
        case "0-50":
          matchesPrice = price < 50;
          break;
        case "50-100":
          matchesPrice = price >= 50 && price < 100;
          break;
        case "100-200":
          matchesPrice = price >= 100 && price < 200;
          break;
        case "200+":
          matchesPrice = price >= 200;
          break;
      }
    }

    return matchesSearch && matchesType && matchesStatus && matchesPrice;
  });

  displayProperties(filteredProperties);
}

// Load and display all properties
function loadProperties() {
  displayProperties(properties);
}

// Display properties in the grid
function displayProperties(propertiesToShow) {
  if (!elements.propertiesGrid) return;
  elements.propertiesGrid.innerHTML = "";

  if (propertiesToShow.length === 0) {
    elements.propertiesGrid.innerHTML = `
            <div class="no-properties">
                <h3>No properties found</h3>
                <p>Try adjusting your search criteria or filters.</p>
            </div>
        `;
    return;
  }

  propertiesToShow.forEach((property) => {
    const propertyCard = createPropertyCard(property);
    elements.propertiesGrid.appendChild(propertyCard);
  });
}

// Create property card element
function createPropertyCard(property) {
  const card = document.createElement("div");
  card.className = "property-card fade-in-up";

  const statusClass = property.status === "sale" ? "sale" : "rent";

  card.innerHTML = `
        <div class="property-image">
            <img src="${property.image}" alt="${property.title}">
            <div class="property-status ${statusClass}">For ${
    property.status === "sale" ? "Sale" : "Rent"
  }</div>
            <div class="property-price">${property.price}</div>
        </div>
        <div class="property-details">
            <h3>${property.title}</h3>
            <p class="property-location">
                <i class="fas fa-map-marker-alt"></i> ${property.location}
            </p>
            <div class="property-features">
                ${property.features
                  .map((feature) => `<span>${feature}</span>`)
                  .join("")}
            </div>
            <p class="property-description">${property.description}</p>
            <a href="#contact" class="btn btn-primary">Inquire Now</a>
        </div>
    `;

  return card;
}

// Contact form functionality
function initializeContactForm() {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    submitContactForm();
  });
}

// Submit contact form
function submitContactForm() {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const type = formData.get("inquiryType"); // from your select
  const message = formData.get("message");

  // Create mailto link
  const mailtoLink = `mailto:nextphaserealestateltd@gmail.com?subject=${encodeURIComponent(
    type
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
  )}`;

  // Open user's default email app
  window.location.href = mailtoLink;

  // Reset form
  contactForm.reset();

  // Show success notification (optional)
  showNotification("Opening your email app to send message...", "success");
}

// Initialize animations
function initializeAnimations() {
  // Add animation classes to elements when they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".property-card, .service-item, .service-card, .contact-item"
  );
  animateElements.forEach((el) => observer.observe(el));
}

// Initialize scroll effects
function initializeScrollEffects() {
  // Parallax effect for hero background
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector(".hero-background");
    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
}

// Show notification
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "var(--success-color)"
            : type === "error"
            ? "var(--error-color)"
            : "var(--primary-color)"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", function () {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}

// Utility functions
function formatPrice(price) {
  if (typeof price === "string") {
    return price;
  }
  return `₦${price.toLocaleString()}`;
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounce search input (guard against missing element)
if (elements.searchInput) {
  elements.searchInput.addEventListener(
    "input",
    debounce(filterProperties, 300)
  );
}

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  // Ctrl/Cmd + K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    searchInput.focus();
  }

  // Escape to close modals
  if (e.key === "Escape") {
    adminModal.style.display = "none";
    addPropertyModal.style.display = "none";
  }
});

// Performance optimization: Lazy load images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", lazyLoadImages);

// Add some CSS for notifications
const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .admin-property-item,
    .admin-inquiry-item {
        background: var(--dark-surface);
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: var(--border-radius);
        border: 1px solid var(--dark-border);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .property-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .btn-sm {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
    }
    
    .no-properties {
        text-align: center;
        padding: 3rem;
        grid-column: 1 / -1;
    }
    
    .no-properties h3 {
        color: var(--text-primary);
        margin-bottom: 1rem;
    }
    
    .no-properties p {
        color: var(--text-secondary);
    }
`;

document.head.appendChild(notificationStyles);
