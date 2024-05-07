document.addEventListener("DOMContentLoaded", () => {
  try {
      handleInitialization();
  } catch (error) {
      console.error("An error occurred during initialization:", error.message);
  }
});

const handleInitialization = () => {
  handleInput();
  handleScrolling();
  handleLanguage();
  handleAppInitialization();
};

const handleInput = () => {
  handleSearchInput();
  handleNavClick();
  handleStyling('');
  handleHeartClick();
  handleActiveNavOnScroll();
  handleContainerRotation();
  handleRecentSearches();
  displayRecentSearches();
};

const handleScrolling = () => {
  revealOnScroll();
  handleCardFlip();
  handleScroll();
};

const handleLanguage = () => {
  translateContent('en');
  toggleLanguageMenu();
};

const handleAppInitialization = () => {
  startImageSliders();
  initializeRecipeApp();
  initializeVideoGallery();
};

// Function to handle search input events
const handleSearchInput = () => {
    try {
        // Find the search input element
        const searchInput = document.querySelector('.search-bar input');
        if (!searchInput) {
            // Throw an error if search input element not found
            throw new Error("Search input element not found.");
        }
  
        // Add event listener for real-time search input
        searchInput.addEventListener('input', () => {
            // Retrieve and process the search query
            const searchQuery = searchInput.value.toLowerCase().trim();
            // Update styling and show suggestions based on search query
            handleStyling(searchQuery);
            showSuggestions(searchQuery);
        });
  
        // Add event listener for final search query
        searchInput.addEventListener('change', () => {
            // Retrieve and process the search query
            const searchQuery = searchInput.value.toLowerCase().trim();
            // Handle empty search query: update styling and show only category section
            if (searchQuery === '') {
                handleStyling(searchQuery);
                showOnlyCategorySection();
            }
        });
    } catch (error) {
        // Log any errors occurred during execution
        console.error("An error occurred in handleSearchInput:", error.message);
    }
};
  
// Function to handle styling based on search query
const handleStyling = searchQuery => {
    try {
        // Convert search query to lowercase for consistency
        const searchQueryLower = searchQuery.toLowerCase();
        // Determine display style based on search query presence
        const displayBlock = (searchQuery === '') ? 'block' : 'none';
        const displayFlex = (searchQuery === '') ? 'flex' : 'none';
  
        // Define sections and their corresponding display styles
        const sections = {
            '.category': displayBlock,
            '.instagram': displayBlock,
            '.hero-section': displayFlex,
            '.contact-section': displayFlex,
            '.video-tutorial': displayBlock,
        };
  
        // Apply styling to each section
        for (const section in sections) {
            applySectionStyling(section, sections[section]);
        }
  
        // Find and handle card elements
        const cards = document.querySelectorAll('.card');
        if (!cards || cards.length === 0) {
            throw new Error("No card elements found.");
        }
  
        let hasResults = false;
        // Iterate over each card to match search query and toggle visibility
        cards.forEach(card => {
            const foodNameElement = card.querySelector('h1');
            if (!foodNameElement) {
                throw new Error("Food name element not found in card.");
            }
            const foodName = foodNameElement.innerText.toLowerCase();
            const isMatching = (searchQuery === '' || foodName.includes(searchQueryLower));
            card.classList.toggle('hidden', !isMatching);
            if (isMatching) {
                hasResults = true;
            }
        });
  
        // Find and handle no results message element
        const noResultsMessage = document.querySelector('.no-results-message');
        if (!noResultsMessage) {
            throw new Error("No results message element found.");
        }
        // Display no results message if no matching cards found
        if (!hasResults) {
            noResultsMessage.style.display = 'block';
            noResultsMessage.querySelector('h2').innerText = `No results found for: "${searchQuery}"`;
        } else {
            // Hide no results message if matching cards found
            noResultsMessage.style.display = 'none';
        }
    } catch (error) {
        // Log any errors occurred during execution
        console.error("An error occurred in handleStyling:", error.message);
    }
  };  

// URL for the preview images
const recipesWithPreviews = () => ({
    "Cake": "../images/recipe1/bread.jpg",
    "Chicken Adobo": "../images/sliderImage/Adobo1.jpg",
    "Recipe & Menus": "../images/sliderImage/Adobo2.jpg",
    "Beef Adobo": "../images/sliderImage/Adobo2.jpg"
});

const getImageUrlForRecipe = recipeName => recipesWithPreviews().hasOwnProperty(recipeName) ? recipesWithPreviews()[recipeName] : 'Adobohome.jpg';

// Function to show suggestions based on search query
const showSuggestions = searchQuery => {
    try {
        // Access recipesWithPreviews object
        const recipes = recipesWithPreviews();
        
        // Find the suggestions container element
        const suggestionsContainer = document.querySelector('.suggestions-container');
        if (!suggestionsContainer) {
            // Throw an error if suggestions container not found
            throw new Error("Suggestions container not found.");
        }

        // Clear previous content in the suggestions container
        suggestionsContainer.innerHTML = '';

        // Array to store suggested recipes
        const suggestedRecipes = [];

        // Iterate over each recipe in the object
        for (const recipeName in recipes) {
            if (recipeName.toLowerCase().includes(searchQuery.toLowerCase())) {
                const previewPath = getImageUrlForRecipe(recipeName);
                suggestedRecipes.push({ recipeName, previewPath });
            }
        }

        // Display or hide suggestions container based on search query presence
        suggestionsContainer.style.display = searchQuery ? 'block' : 'none';

        // Add suggestion elements for each suggested recipe
        suggestedRecipes.forEach(({ recipeName, previewPath }) => {
            const suggestion = document.createElement('div');
            suggestion.classList.add('suggestion');

            // Create image element for preview
            const previewImage = document.createElement('img');
            previewImage.classList.add('preview-image');
            previewImage.src = previewPath; // Use the provided preview image path
            suggestion.appendChild(previewImage);

            // Create text element for recipe name
            const recipeNameElement = document.createElement('span');
            recipeNameElement.textContent = recipeName;
            suggestion.appendChild(recipeNameElement);

            // Add click event listener to handle suggestion click
            suggestion.addEventListener('click', () => {
                handleSuggestionClick(recipeName);
            });

            suggestionsContainer.appendChild(suggestion);
        });
    } catch (error) {
        // Log any errors occurred during execution
        console.error("Error in showSuggestions:", error.message);
    }
};


// Function to handle click event on search suggestions
const handleSuggestionClick = recipe => {
    try {
        // Find search input and suggestions container elements
        const searchInput = document.querySelector('.search-bar input');
        const suggestionsContainer = document.querySelector('.suggestions-container');
  
        // Throw errors if search input or suggestions container not found
        if (!searchInput) throw new Error("Search input element not found.");
        if (!suggestionsContainer) throw new Error("Suggestions container element not found.");
  
        // Set search input value to the clicked recipe
        searchInput.value = recipe;
  
        // Apply styling based on the clicked recipe
        try {
            handleStyling(recipe.toLowerCase());
        } catch (stylingError) {
            // Log any errors occurred during styling application
            console.error("Error applying styling: ", stylingError);
        }
  
        // Hide the suggestions container
        suggestionsContainer.style.display = 'none';
    } catch (error) {
        // Log any errors occurred during execution
        console.error("Error in handleSuggestionClick: ", error);
    }
};  

const applySectionStyling = (section, displayValue) => {
  try {
      const element = document.querySelector(section);
      if (!element) {
          throw new Error(`Element ${section} not found.`);
      }
      element.style.display = displayValue;
  } catch (error) {
      console.error("An error occurred in applySectionStyling:", error.message);
  }
};

const showOnlyCategorySection = () => {
  try {
      const categorySections = document.querySelectorAll('.category-section');
      if (!categorySections || categorySections.length === 0) {
          throw new Error("Category sections not found.");
      }
      categorySections.forEach(section => {
          section.style.display = 'block';
      });
  } catch (error) {
      console.error("An error occurred in showOnlyCategorySection:", error.message);
  }
};

const handleScroll = () => {
  try {
      const categorySection = document.querySelector('.category');
      const header = document.querySelector('header');
      if (!categorySection) {
          throw new Error("Category section not found.");
      }
      if (!header) {
          throw new Error("Header not found.");
      }
      // Adjust padding of category section based on scroll position
      const headerHeight = header.offsetHeight;
      window.addEventListener('scroll', () => {
          categorySection.style.paddingTop = (window.scrollY > headerHeight) ? '80px' : '0';
      });
  } catch (error) {
      console.error("An error occurred in handleScroll:", error.message);
  }
};

const revealOnScroll = () => {
  try {
      const reveals = document.querySelectorAll('.reveal');
      if (!reveals || reveals.length === 0) {
          throw new Error("Reveal elements not found.");
      }
      // Add event listener to reveal elements on scroll
      window.addEventListener('scroll', () => {
          const revealPoint = 150;
          reveals.forEach(reveal => {
              const revealTop = reveal.getBoundingClientRect().top;
              const windowHeight = window.innerHeight;
              const isRevealed = (revealTop < windowHeight - revealPoint);
              reveal.classList.toggle('active', isRevealed);
          });
      });
  } catch (error) {
      console.error("An error occurred in revealOnScroll:", error.message);
  }
};

const handleNavClick = () => {
  try {
      const navLinks = document.querySelectorAll(".navbar ul li a");
      if (!navLinks || navLinks.length === 0) {
          throw new Error("Navigation links not found.");
      }
      // Add event listener for navigation link clicks
      navLinks.forEach(navLink => {
          navLink.addEventListener("click", () => {
              setActiveNavLink(navLink);
          });
      });
  } catch (error) {
      console.error("An error occurred in handleNavClick:", error.message);
  }
};

const setActiveNavLink = link => {
  try {
      const navLinks = document.querySelectorAll(".navbar ul li a");
      if (!navLinks || navLinks.length === 0) {
          throw new Error("Navigation links not found.");
      }
      navLinks.forEach(navLink => {
          navLink.classList.remove("activeClass");
      });
      link.classList.add("activeClass");
  } catch (error) {
      console.error("An error occurred in setActiveNavLink:", error.message);
  }
};

const handleHeartClick = () => {
  try {
      event.stopPropagation();
      const hearts = document.querySelectorAll('.fa-heart');
      if (!hearts || hearts.length === 0) {
          throw new Error("Heart icons not found.");
      }
      // Add event listener for heart icon clicks
      hearts.forEach(heart => {
          heart.addEventListener('click', () => {
              heart.classList.toggle('clicked');
          });
      });
  } catch (error) {
      console.error("An error occurred in handleHeartClick:", error.message);
  }
};

const handleActiveNavOnScroll = () => {
  try {
      const navLinks = document.querySelectorAll(".navbar ul li a");
      const header = document.querySelector('header');
      if (!navLinks || navLinks.length === 0 || !header) {
          throw new Error("Navigation links or header not found.");
      }
      // Set up IntersectionObserver to track section visibility
      const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
              const targetId = entry.target.id;
              if (entry.isIntersecting && targetId) {
                  navLinks.forEach(link => {
                      link.classList.remove("activeClass");
                  });
                  const correspondingNavLink = document.querySelector(`.navbar ul li a[href="#${targetId}"]`);
                  if (correspondingNavLink) {
                      correspondingNavLink.classList.add('activeClass');
                  }
              }
          });
      }, { threshold: 0.5 });
      // Observe sections for intersection
      const sectionsToObserve = document.querySelectorAll('.hero-section, .category, .category-container-image, .instagram, .contact-section');
      if (!sectionsToObserve || sectionsToObserve.length === 0) {
          throw new Error("Sections to observe not found.");
      }
      sectionsToObserve.forEach(section => {
          observer.observe(section);
      });
  } catch (error) {
      console.error("An error occurred in handleActiveNavOnScroll:", error.message);
  }
};

const handleContainerRotation = () => {
  try {
      const heroSection = document.getElementById('hero-section');
      if (!heroSection) {
          throw new Error("Hero section element not found.");
      }

      const container = heroSection.querySelector('.content-container');
      if (!container) {
          throw new Error("Content container element not found within hero section.");
      }
      // Function to calculate mouse position relative to hero section
      const calculateMousePosition = (e) => {
          const mouseX = e.clientX - heroSection.offsetLeft;
          const mouseY = e.clientY - heroSection.offsetTop;
          return { mouseX, mouseY };
      };
      // Function to calculate rotation values based on mouse position
      const calculateRotation = (mouseX, mouseY) => {
          const centerX = heroSection.offsetWidth / 2;
          const centerY = heroSection.offsetHeight / 2;

          const dx = mouseX - centerX;
          const dy = mouseY - centerY;

          const tiltX = (dy / centerY) * 10;
          const tiltY = -(dx / centerX) * 10;

          return { tiltX, tiltY };
      };
      // Add event listener to rotate content container based on mouse movement
      heroSection.addEventListener('mousemove', (e) => {
          const { mouseX, mouseY } = calculateMousePosition(e);
          const { tiltX, tiltY } = calculateRotation(mouseX, mouseY);
          container.style.transform = `translate(${tiltX}px, ${tiltY}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      });
      // Reset container rotation on mouse leave
      heroSection.addEventListener('mouseleave', () => {
          container.style.transform = 'translate(0, 0) rotateX(0deg) rotateY(0deg)';
      });
  } catch (error) {
      console.error("An error occurred in handleContainerRotation:", error.message);
  }
};

const translateContent = language => {
  const translations = {
      'en': {
        'home': 'Home',
        'categories': 'Categories',
        'recipe': 'Recipe',
        'blog': 'Blog',
        'contact': 'Contact',
        'spicy_delicious_chicken_adobo': 'Spicy Delicious Chicken Adobo',
        'lorem_ipsum': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque a, quo et nam aliquid alias iusto minima dignissimos harum praesentium labore.',
        'breakfast': 'Breakfast',
        'lunch': 'Lunch',
        'dessert': 'Dessert',
        'vegan': 'Vegan',
        'chocolate': 'Chocolate',
        'meat': 'Meat',
        'popular_recipes': 'Popular Recipes',
        'cake': 'Cake',
        'view_all_recipe': 'View all Recipe',
        'check_our_foodieland': 'Check our @Foodieland On Instagram',
        'visit_our_instagram': 'Visit Our Instagram',
        'contact_us': 'Contact Us',
        'submit': 'Submit',
        'contact_us_info': 'Contact Us: email@email.com | Phone: (123) 456-7890'
      },
      'ja': {
        'home': 'ホーム',
        'categories': 'カテゴリー',
        'recipe': 'レシピ',
        'blog': 'ブログ',
        'contact': 'コンタクト',
        'spicy_delicious_chicken_adobo': 'スパイシーデリシャスチキンアドボ',
        'view_recipe': 'レシピを表示する',
        'lorem_ipsum': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque a, quo et nam aliquid alias iusto minima dignissimos harum praesentium labore.',
        'breakfast': '朝食',
        'lunch': 'ランチ',
        'dessert': 'デザート',
        'vegan': 'ビーガン',
        'chocolate': 'チョコレート',
        'meat': 'ミート',
        'popular_recipes': '人気のレシピ',
        'cake': 'ケーキ',
        'view_all_recipe': 'すべてのレシピを表示',
        'check_our_foodieland': 'Instagramの@Foodielandをチェック',
        'visit_our_instagram': 'Instagramを訪問',
        'contact_us': 'お問い合わせ',
        'submit': '送信',
        'contact_us_info': 'お問い合わせ：email@email.com | 電話：（123）456-7890'
      }
  };
  try {
      if (!translations[language]) {
          throw new Error(`Translations not available for language '${language}'.`);
      }

      const elements = document.querySelectorAll('[data-translate]');
      elements.forEach(element => {
          const key = element.dataset.translate;
          const translation = translations[language][key];
          if (translation !== undefined) {
              element.textContent = translation;
          } else {
              console.warn(`Translation not found for key '${key}' in language '${language}'.`);
          }
      });
  } catch (error) {
      console.error("An error occurred in translateContent:", error.message);
  }
};

const changeLanguage = language => {
  translateContent(language);
};

const toggleLanguageMenu = () => {
  try {
      const languageMenu = document.querySelector('.lang-menu');
      if (languageMenu) {
          languageMenu.style.display = (languageMenu.style.display === 'none') ? 'block' : 'none';
      } else {
          console.error("Language menu element not found.");
      }
  } catch (error) {
      console.error("An error occurred in toggleLanguageMenu:", error.message);
  }
};

const changeLanguageAndToggleText = language => {
  try {
      // Change the language
      changeLanguage(language);
      // Update the text of the language toggle button
      const langButton = document.querySelector('.lang-button');
      if (langButton) {
          langButton.textContent = (language === 'en') ? 'English' : '日本語';
      } else {
          console.error("Language toggle button element not found.");
      }
  } catch (error) {
      console.error("An error occurred in changeLanguageAndToggleText:", error.message);
  }
};

const handleCardFlip = () => {
    try {
      const cards = document.querySelectorAll('.card');
      if (cards.length > 0) {
        cards.forEach(card => {
          // Add event listener only to the card element
          card.addEventListener('click', (event) => {
            // Check if it is the actual card
            if (event.target === card) {
              card.classList.toggle('flipped');
            }
          });
        });
      } else {
        console.error("No card elements found.");
      }
    } catch (error) {
      console.error("An error occurred in handleCardFlip:", error.message);
    }
};

const startImageSliders = () => {
  try {
      // Get the slider element
      const slider = document.getElementById('slider');
      if (!slider) throw new Error("Slider element not found.");
      // Define image URLs for the slider
      const images = ['../images/sliderImage/Adobo2.jpg', '../images/sliderImage/Adobo1.jpg', '../images/sliderImage/chef.png'];
      // Define image URLs for each card (category cards and recipe cards combined)
      const allCards = {
           // URLS for the category cards
          'breakfast-card': ['../images/breakfast/bread.jpg', '../images/breakfast/pancake.jpg', '../images/breakfast/pancake1.jpg'],
          'lunch-card': ['../images/lunch/bread.jpg', '../images/lunch/pancake.jpg', '../images/lunch/pancake1.jpg'],
          'dessert-card': ['../images/dessert/bread.jpg', '../images/dessert/pancake.jpg', '../images/dessert/pancake1.jpg'],
          'vegan-card': ['../images/vegan/bread.jpg', '../images/vegan/pancake.jpg', '../images/vegan/pancake1.jpg'],
          'chocolate-card': ['../images/chocolate/bread.jpg', '../images/chocolate/pancake.jpg', '../images/chocolate/pancake1.jpg'],
          'meat-card': ['../images/meat/bread.jpg', '../images/meat/pancake.jpg', '../images/meat/pancake1.jpg'],
          // URLs for the recipe cards
          'recipe1': ['../images/recipe1/bread.jpg', '../images/recipe1/pancake.jpg', '../images/recipe1/pancake1.jpg'],
          'recipe2': ['../images/recipe2/bread.jpg', '../images/recipe2/pancake.jpg', '../images/recipe2/pancake1.jpg'],
          'recipe3': ['../images/recipe3/bread.jpg', '../images/recipe3/pancake.jpg', '../images/recipe3/pancake1.jpg'],
          'recipe4': ['../images/recipe4/bread.jpg', '../images/recipe4/pancake.jpg', '../images/recipe4/pancake1.jpg'],
          'recipe5': ['../images/recipe5/bread.jpg', '../images/recipe5/pancake.jpg', '../images/recipe5/pancake1.jpg'],
          'recipe6': ['../images/recipe6/bread.jpg', '../images/recipe6/pancake.jpg', '../images/recipe6/pancake1.jpg'],
      };
      // Initialize slider index and card indices
      let sliderIndex = 0;
      let cardIndices = {};
      // Function to change images in the slider and cards
      const changeImages = () => {
          try {
              // Change background image for the slider
              slider.style.backgroundImage = `url('${images[sliderIndex]}')`;
              sliderIndex = (sliderIndex + 1) % images.length;
              // Change background images for all cards
              for (const cardId in allCards) {
                  const card = document.getElementById(cardId);
                  if (card) {
                      if (!cardIndices[cardId]) cardIndices[cardId] = 0;
                      let index = cardIndices[cardId];
                      index = (index + 1) % allCards[cardId].length;
                      card.style.backgroundImage = `url('${allCards[cardId][index]}')`;
                      cardIndices[cardId] = index;
                  } else {
                      // Log a warning if card element is not found
                      console.warn(`Card element with ID '${cardId}' not found.`);
                  }
              }
          } catch (error) {
              console.error("An error occurred in changeImages:", error.message);
          }
      };
      // Call the changeImages function at regular intervals
      setInterval(changeImages, 3000);
  } catch (error) {
      console.error("An error occurred in startImageSliders:", error.message);
  }
};

const initializeRecipeApp = () => {
  try {
      const seasonalRecipes = {
          spring: {
              name: "Spring Salad",
              description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit et quae odio corrupti impedit enim voluptatem illum adipisci sunt! Consectetur, modi.",
              time: "20 Minutes",
              category: "Salad",
              creator: {
                  name: "Jane Doe",
                  date: "April 1, 2024"
              },
              image: "../images/heroSection/spring salad.jpg",
              link: "#"
          },
          summer: {
              name: "Grilled BBQ Chicken",
              description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit et quae odio corrupti impedit enim voluptatem illum adipisci sunt! Consectetur, modi.",   
              time: "45 Minutes",
              category: "Chicken",
              creator: {
                  name: "Ronalyn",
                  date: "June 15, 2024"
              },
              image: "../images/heroSection/grilledBarbeque.jpg",
              link: "#"
          },
          fall: {
              name: "Pumpkin Spice Latte",
              description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit et quae odio corrupti impedit enim voluptatem illum adipisci sunt! Consectetur, modi.",
              time: "10 Minutes",
              category: "Beverage",
              creator: {
                  name: "Anne",
                  date: "October 10, 2024"
              },
              image: "../images/heroSection/pumpkinlatte.jpg",
              link: "#"
          },
          winter: {
              name: "Winter Vegetable Soup",
              description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit et quae odio corrupti impedit enim voluptatem illum adipisci sunt! Consectetur, modi.",
              time: "60 Minutes",
              category: "Soup",
              creator: {
                  name: "Jasmin",
                  date: "December 20, 2024"
              },
              image: "../images/heroSection/wintersoup.jpg",
              link: "#"
          }
      };

      const getCurrentSeason = () => {
          const now = new Date();
          const second = now.getSeconds(); // Get the current second
          // Define the duration for each season in seconds
          const springDuration = 10;
          const summerDuration = 10;
          const fallDuration = 10;
          // Calculate the current season based on the current second
          if (second < springDuration) {
              return "spring";
          } else if (second < springDuration + summerDuration) {
              return "summer";
          } else if (second < springDuration + summerDuration + fallDuration) {
              return "fall";
          } else {
              return "winter";
          }
      };

      const updateHeroSection = () => {
          const currentSeason = getCurrentSeason();
          const recipe = seasonalRecipes[currentSeason];
          if (!recipe) throw new Error(`Recipe not found for season: ${currentSeason}`);
          const heroSection = document.querySelector(".hero-section");
          if (!heroSection) throw new Error("Hero section not found.");

          heroSection.classList.add("fade-out");

          setTimeout(() => {
              document.querySelector(".hero-section h1").textContent = recipe.name;
              document.querySelector(".hero-section p").textContent = recipe.description;
              document.querySelector(".clock-container span").textContent = recipe.time;
              document.querySelector(".category-container span").textContent = recipe.category;
              document.querySelector(".creator-container .name").textContent = recipe.creator.name;
              document.querySelector(".creator-container span:last-of-type").textContent = recipe.creator.date;
              document.querySelector(".image-container img").src = recipe.image;
              document.querySelector(".btn a").href = recipe.link;
              // Remove the class to trigger the transition back
              heroSection.classList.remove("fade-out");
          }, 500);
      };
      // Update the hero section every 10 seconds
      setInterval(updateHeroSection, 10000);
  } catch (error) {
      console.error("An error occurred in initializeRecipeApp:", error.message);
  }
};

const addRecentSearch = searchTerm => {
  try {
      const recentSearchesList = document.querySelector('.recent-searches-list');
      const modal = document.getElementById("myModal");
      if (!recentSearchesList) throw new Error("Recent searches list not found.");

      // Create a new list item for the recent search
      const li = document.createElement('li');
      // Create a span element for the magnifying glass icon
      const clockIcon = document.createElement('span');
      clockIcon.className = 'clock-icon';
      clockIcon.innerHTML = '<i class="fa-solid fa-clock"></i>';
      // Create a span element for the text content
      const textSpan = document.createElement('span');
      textSpan.textContent = searchTerm;
      // Create a span element for the trash can icon
      const trashIcon = document.createElement('span');
      trashIcon.className = 'trash-icon';
      trashIcon.innerHTML = '<i class="fas fa-trash-alt"></i>';
      // Add click event listener to the text content span
      textSpan.addEventListener('click', (event) => {
          const searchInput = document.querySelector('.search-bar input');
          searchInput.value = searchTerm; // Populate the search input with the clicked text content
          handleStyling(searchTerm); // Trigger the filtering mechanism
          // Hide the recent searches container
          const recentSearchesContainer = document.querySelector('.recent-searches-container');
          recentSearchesContainer.style.display = 'none';
      });
      // Add click event listener to the trash icon
      trashIcon.addEventListener('click', (event) => {
          event.stopPropagation(); // Prevent the click event from bubbling up
          // Display the modal
          modal.style.display = "block";
          // Handle the confirm delete button
          const confirmDeleteBtn = document.getElementById("confirmDelete");
          confirmDeleteBtn.onclick = () => {
              // Remove the search term from the list
              recentSearchesList.removeChild(li);
              // Remove the search term from local storage
              removeRecentSearch(searchTerm, li);
              // Close the modal
              modal.style.display = "none";
          }
          // Handle the cancel delete button
          const cancelDeleteBtn = document.getElementById("cancelDelete");
          cancelDeleteBtn.onclick = () => {
              // Close the modal
              modal.style.display = "none";
          }
      });

      li.appendChild(clockIcon);
      li.appendChild(textSpan);
      li.appendChild(trashIcon);

      if (recentSearchesList.children.length >= 5) {
          recentSearchesList.removeChild(recentSearchesList.lastChild);
      }

      recentSearchesList.prepend(li);
  } catch (error) {
      console.error("An error occurred while adding recent search:", error.message);
  }
};

const removeRecentSearch = (searchTerm, li) => {
  try {
      const recentSearchesString = localStorage.getItem('recentSearches');
      if (!recentSearchesString) {
          console.log('No recent searches found in local storage.');
          return; // Exit the function if no recent searches are found
      }

      const recentSearches = JSON.parse(recentSearchesString);
      if (!Array.isArray(recentSearches)) {
          throw new Error('Recent searches data in local storage is not an array.');
      }

      // Find and remove the search term from the recent searches array
      const index = recentSearches.indexOf(searchTerm);
      if (index !== -1) {
          recentSearches.splice(index, 1);
          // Update local storage 
          localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
          console.log('Recent search removed:', searchTerm);
      }
  } catch (error) {
      console.error('An error occurred while removing recent search:', error.message);
  }
};

const saveRecentSearch = searchTerm => {
  try {
      let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
      if (!Array.isArray(recentSearches)) {
          throw new Error("Recent searches data in local storage is not an array.");
      }
      // Ensure the searchTerm is not already in the array to avoid duplicates
      if (!recentSearches.includes(searchTerm)) {
          recentSearches.unshift(searchTerm); // Add new search term to the beginning of the array
          localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
          console.log('Recent searches saved to local storage:', recentSearches);

          updateRecentSearchesDisplay();
      }
  } catch (error) {
      console.error('An error occurred while saving recent search:', error.message);
  }
};

const displayRecentSearches = () => {
  try {
      const recentSearchesList = document.querySelector('.recent-searches-list');
      const recentSearchesString = localStorage.getItem('recentSearches');

      if (!recentSearchesString) {
          console.log('No recent searches found in local storage.');
          return false; // No recent searches found
      }

      const recentSearches = JSON.parse(recentSearchesString);

      if (!Array.isArray(recentSearches) || recentSearches.length === 0) {
          throw new Error('No valid recent searches data in local storage.');
      }

      recentSearchesList.innerHTML = ''; // Clear the previous list
      // Reverse the order of recent searches to display from newest to oldest
      recentSearches.reverse().forEach((searchTerm) => {
          addRecentSearch(searchTerm);
      });

      return true; // Recent searches were successfully displayed
  } catch (error) {
      console.error('An error occurred while displaying recent searches:', error.message);
      return false; // An error occured or no valid recent searches
  }
};

const handleRecentSearches = () => {
  try {
      const searchInput = document.querySelector('.search-bar input');
      const recentSearchesContainer = document.querySelector('.recent-searches-container');
      const recentSearchesList = document.querySelector('.recent-searches-list');
      const modal = document.getElementById("myModal");

      if (!searchInput || !recentSearchesContainer || !recentSearchesList) {
          throw new Error('Search input or recent searches container not found.');
      }

      let typingTimer; // Variable to store the timer

      // Event listener for when the search bar is clicked
      searchInput.addEventListener('click', () => {
          // Attempt to display recent searches and only show the container if there are any
          const hasRecentSearches = displayRecentSearches();
          recentSearchesContainer.style.display = hasRecentSearches ? 'block' : 'none';
      });

      document.addEventListener('mousedown', (event) => {
          const isInsideSearchContainer = recentSearchesContainer.contains(event.target);
          const isInsideModal = modal.contains(event.target);
          const isInsideSearchInput = searchInput.contains(event.target);

          if (!isInsideSearchContainer && !isInsideModal && !isInsideSearchInput) {
              recentSearchesContainer.style.display = 'none';
          }
      });

      // Event listener for when a search term is entered
      searchInput.addEventListener('input', () => {
          clearTimeout(typingTimer); // Clear the previous timer
          const searchTerm = searchInput.value.trim();
          console.log('Search term:', searchTerm); // Log the search term
          if (searchTerm !== '') {
              typingTimer = setTimeout(() => {
                  addRecentSearch(searchTerm);
                  saveRecentSearch(searchTerm);
              }, 4000); // Delay of 4 seconds
          }
      });
  } catch (error) {
      console.error('An error occurred while handling recent searches:', error.message);
  }
};

const initializeVideoGallery = () => {
    try {
        const videos = [
            { src: '../video/cooking1.mp4', thumbnail: './Adobohome.jpg', tooltip: 'Thumbnail Number One' },
            { src: '../video/cooking2.mp4', thumbnail: './Adobohome.jpg', tooltip: 'Thumbnail Number Two' },
            { src: '../video/cooking3.mp4', thumbnail: './Adobohome.jpg', tooltip: 'Thumbnail Number Three' },
            { src: '../video/cooking4.mp4', thumbnail: './Adobohome.jpg', tooltip: 'Thumbnail Number Four' }
        ];

        let currentVideoIndex = 0;

        const thumbnailList = document.querySelector('.navigation12');
        if (!thumbnailList) {
            throw new Error('Could not find thumbnail list element.');
        }

        const videoUrl = (videoIndex) => {
            const video = document.getElementById('slider1');
            const thumbnails = thumbnailList.querySelectorAll('li');

            if (!video || thumbnails.length === 0) {
                throw new Error('Could not find required elements.');
            }

            fadeOutVideo(video);

            setTimeout(() => {
                loadNewVideo(video, videos[videoIndex].src);
                fadeInVideo(video);
            }, 300);

            toggleActiveThumbnail(thumbnails, videoIndex);
            currentVideoIndex = videoIndex;
            updateButtonStates();
        };

        renderThumbnails(thumbnailList, videos, videoUrl);

        const { nextButton, prevButton } = initializeSliderButtons();

        const pauseButton = document.getElementById('pauseButton');
        if (!pauseButton) {
            throw new Error('Could not find pause button.');
        }

        const { togglePlayPause, updatePauseButtonIcon } = initializePauseButton();

        pauseButton.addEventListener('click', togglePlayPause);

        nextButton.addEventListener('click', () => {
            const nextIndex = (currentVideoIndex + 1) % videos.length;
            videoUrl(nextIndex);
        });

        prevButton.addEventListener('click', () => {
            const prevIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
            videoUrl(prevIndex);
        });

        const video = document.getElementById('slider1');
        video.addEventListener('play', () => {
            updatePauseButtonIcon(true);
        });
        video.addEventListener('pause', () => {
            updatePauseButtonIcon(false);
        });

        const updateButtonStates = () => {
            prevButton.disabled = currentVideoIndex === 0;
            prevButton.classList.toggle('disabled-button', currentVideoIndex === 0);

            nextButton.disabled = currentVideoIndex === videos.length - 1;
            nextButton.classList.toggle('disabled-button', currentVideoIndex === videos.length - 1);
        };

        updateButtonStates();

    } catch (error) {
        console.error('An error occurred:', error);
    }
};

const fadeOutVideo = video => {
    try {
        video.classList.add('fade-out');
    } catch (error) {
        console.error('An error occurred while fading out the video:', error);
    }
};

const fadeInVideo = video => {
    try {
        video.classList.remove('fade-out');
    } catch (error) {
        console.error('An error occurred while fading in the video:', error);
    }
};

const loadNewVideo = (video, src) => {
    try {
        video.src = src;
        video.load();
    } catch (error) {
        console.error('An error occurred while loading a new video:', error);
    }
};

const toggleActiveThumbnail = (thumbnails, videoIndex) => {
    try {
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle('active', index === videoIndex);
        });
    } catch (error) {
        console.error('An error occurred while toggling active thumbnail:', error);
    }
};

const renderThumbnails = (thumbnailList, videos, videoUrl) => {
    try {
        videos.forEach((video, index) => {
            const li = document.createElement('li');
            li.classList.add('tooltip');
            if (index === 0) li.classList.add('active'); 
            
            li.addEventListener('click', () => {
                updateActiveThumbnail(index);
                videoUrl(index);
            });

            const img = document.createElement('img');
            img.src = video.thumbnail;
            img.alt = 'Thumbnail for ' + video.title;
            img.loading = "lazy";

            const span = document.createElement('span');
            span.classList.add('tooltiptext');
            span.textContent = video.tooltip;

            li.appendChild(img);
            li.appendChild(span);

            thumbnailList.appendChild(li);
        });
    } catch (error) {
        console.error('An error occurred while rendering thumbnails:', error);
    }
};

const updateActiveThumbnail = activeIndex => {
    const thumbnails = document.querySelectorAll('.tooltip');
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.classList.remove('active');
        if (index === activeIndex) {
            thumbnail.classList.add('active');
        }
    });
};

const initializeSliderButtons = () => {
    try {
        const nextButton = document.getElementById('nextButton');
        const prevButton = document.getElementById('prevButton');

        if (!nextButton || !prevButton) {
            throw new Error('Could not find slider buttons.');
        }

        return { nextButton, prevButton };
    } catch (error) {
        console.error('An error occurred while initializing slider buttons:', error);
    }
};

const initializePauseButton = () => {
    try {
        const togglePlayPause = () => {
            const video = document.getElementById('slider1');
            if (!video) {
                return;
            }

            if (video.paused) {
                playVideo(video);
                updatePauseButtonIcon(true);
            } else {
                pauseVideo(video);
                updatePauseButtonIcon(false);
            }
        };

        const playVideo = (video) => {
            video.play();
        };

        const pauseVideo = (video) => {
            video.pause();
        };

        const updatePauseButtonIcon = isPlaying => {
            const pauseButton = document.getElementById('pauseButton');
            if (!pauseButton) {
                return;
            }

            pauseButton.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
        };

        return { togglePlayPause, playVideo, pauseVideo, updatePauseButtonIcon };
    } catch (error) {
        console.error('An error occurred while initializing pause button:', error);
    }
};