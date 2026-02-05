// Course Class
class Course {
  constructor(id, name, category, price) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
  }
}

// Course Data
const courses = [
  new Course(1, "AI Fundamentals", "AI", 250),
  new Course(2, "Machine Learning", "AI", 300),
  new Course(3, "AWS Cloud Essentials", "Cloud", 200),
  new Course(4, "Azure Cloud Services", "Cloud", 220)
];

// Cart using Map
const cart = new Map();

// DOM Elements
const courseList = document.getElementById("courseList");
const cartDiv = document.getElementById("cart");
const totalSpan = document.getElementById("total");
const filterSelect = document.getElementById("categoryFilter");

// Render Course List
const renderCourses = (category = "all") => {
  courseList.innerHTML = "";

  courses
    .filter(course => category === "all" || course.category === category)
    .forEach(course => {
      courseList.innerHTML += `
        <div class="course">
          <strong>${course.name}</strong><br>
          Category: ${course.category}<br>
          Price: $${course.price}
          <button data-add="${course.id}">Add</button>
        </div>
      `;
    });
};

// Render Cart
const renderCart = () => {
  cartDiv.innerHTML = "";

  cart.forEach(course => {
    cartDiv.innerHTML += `
      <div class="cart-item">
        ${course.name} - $${course.price}
        <button data-remove="${course.id}">Remove</button>
      </div>
    `;
  });

  const total = [...cart.values()]
    .reduce((sum, course) => sum + course.price, 0);

  totalSpan.textContent = total;
};

// Event Delegation for Add / Remove
document.addEventListener("click", e => {
  const addId = e.target.dataset.add;
  const removeId = e.target.dataset.remove;

  if (addId) {
    const course = courses.find(c => c.id == addId);
    cart.set(course.id, course);
    renderCart();
  }

  if (removeId) {
    cart.delete(Number(removeId));
    renderCart();
  }
});

// Category Filter
filterSelect.addEventListener("change", e => {
  renderCourses(e.target.value);
});

// Initial Load
renderCourses();
