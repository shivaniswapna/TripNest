import Login from "./Login";
import Signup from "./Signup";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Plane,
  Bus,
  TrainFront,
  Ship,
  MapPin,
  CalendarDays,
  Users,
  Search,
  ArrowRight,
  Compass,
  Ticket,
  CreditCard,
  Wallet,
  ShieldCheck,
  Clock,
  Trash2,
  Menu,
  X,
} from "lucide-react";

import "./App.css";

const today = new Date().toISOString().split("T")[0];

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

const destinations = [
  {
    name: "Goa",
    country: "India",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
    description:
      "Relax on beautiful beaches and enjoy the coastal atmosphere.",
  },
  {
    name: "Manali",
    country: "Himachal Pradesh, India",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
    description:
      "Discover mountain views, fresh air and peaceful landscapes.",
  },
  {
    name: "Kerala",
    country: "India",
    price: 7200,
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
    description:
      "Experience green landscapes, backwaters and nature.",
  },
  {
    name: "Paris",
    country: "France",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
    description:
      "Explore famous landmarks, museums and charming streets.",
  },
  {
    name: "Bali",
    country: "Indonesia",
    price: 32000,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    description:
      "Enjoy tropical beaches, temples and island scenery.",
  },
  {
    name: "Singapore",
    country: "Singapore",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80",
    description:
      "Explore a modern city full of gardens and attractions.",
  },
];

const transportOptions = [
  {
    id: "bus",
    name: "Bus",
    icon: Bus,
    description: "Affordable road travel",
    detail: "Comfortable journeys by road",
  },
  {
    id: "train",
    name: "Train",
    icon: TrainFront,
    description: "Relaxed rail journeys",
    detail: "Explore routes by rail",
  },
  {
    id: "flight",
    name: "Flight",
    icon: Plane,
    description: "Reach places faster",
    detail: "Plan a journey by air",
  },
  {
    id: "ship",
    name: "Ship / Ferry",
    icon: Ship,
    description: "Travel by water",
    detail: "Explore water transport options",
  },
];

const trips = {
  bus: [
    {
      id: "B101",
      name: "Express AC Bus",
      time: "08:00 AM",
      price: 850,
    },
    {
      id: "B102",
      name: "Sleeper Bus",
      time: "09:30 PM",
      price: 1250,
    },
  ],
  train: [
    {
      id: "T101",
      name: "Express Train",
      time: "06:30 AM",
      price: 650,
    },
    {
      id: "T102",
      name: "Superfast Train",
      time: "07:45 PM",
      price: 1100,
    },
  ],
  flight: [
    {
      id: "F101",
      name: "Economy Flight",
      time: "09:15 AM",
      price: 4500,
    },
    {
      id: "F102",
      name: "Evening Flight",
      time: "06:40 PM",
      price: 6200,
    },
  ],
  ship: [
    {
      id: "S101",
      name: "Passenger Ferry",
      time: "10:00 AM",
      price: 1800,
    },
    {
      id: "S102",
      name: "Evening Cruise",
      time: "05:30 PM",
      price: 3500,
    },
  ],
};

function readBookings() {
  try {
    return JSON.parse(
      localStorage.getItem("tripnestBookings") || "[]"
    );
  } catch {
    return [];
  }
}

// NAVIGATION

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setMenuOpen(false);
    window.location.href = "/login";
  }

  const links = [
    { to: "/", label: "Home" },
    { to: "/destinations", label: "Destinations" },
    { to: "/transport", label: "Transport" },
    { to: "/bookings", label: "My Bookings" },
    { to: "/login", label: "Login" },
    { to: "/signup", label: "Sign Up" },
  ];

  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link
          to="/"
          className="brand"
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-icon">
            <Compass size={23} />
          </span>
          TripNest
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}

          <Link
            to="/transport"
            className="nav-book-button"
            onClick={() => setMenuOpen(false)}
          >
            Book a Trip
          </Link>

          {localStorage.getItem("token") && (
            <button
              type="button"
              className="secondary-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <Link to="/" className="brand footer-brand">
        <Compass size={21} />
        TripNest
      </Link>
      <p>Your journey, planned in one place.</p>
    </footer>
  );
}

// DESTINATION CARDS

function DestinationCard({ destination }) {
  return (
    <article className="destination-card">
      <img
        src={destination.image}
        alt={destination.name}
      />

      <div className="destination-content">
        <span className="eyebrow">{destination.country}</span>

        <h3>{destination.name}</h3>

        <p>{destination.description}</p>

        <div className="destination-bottom">
          <div>
            <small>Trip budget</small>
            <strong>{money(destination.price)}</strong>
          </div>

          <Link
            to="/transport"
            className="icon-link"
            aria-label={`Plan a trip to ${destination.name}`}
          >
            <ArrowRight size={19} />
          </Link>
        </div>
      </div>
    </article>
  );
}

// HOME PAGE

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">
            <Compass size={15} />
            YOUR NEXT ADVENTURE STARTS HERE
          </span>

          <h1>
            Travel more.
            <br />
            Worry less.
          </h1>

          <p>
            Discover beautiful destinations and plan your
            journey with convenient transport options and
            easy booking management.
          </p>

          <div className="hero-actions">
            <Link
              to="/destinations"
              className="primary-button"
            >
              Explore destinations
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/transport"
              className="secondary-button"
            >
              Book transport
            </Link>
          </div>

          <div className="hero-points">
            <span>
              <ShieldCheck size={17} />
              Simple planning
            </span>

            <span>
              <Ticket size={17} />
              Easy booking
            </span>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1100&q=85"
            alt="Mountain landscape"
          />

          <div className="floating-card">
            <span className="floating-icon">
              <MapPin size={20} />
            </span>

            <div>
              <strong>Your next destination</strong>
              <small>Adventure is waiting</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">EXPLORE THE WORLD</span>
            <h2>Popular destinations</h2>
            <p>Find inspiration for your next getaway.</p>
          </div>

          <Link
            to="/destinations"
            className="text-link"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="destination-grid">
          {destinations.slice(0, 3).map((destination) => (
            <DestinationCard
              key={destination.name}
              destination={destination}
            />
          ))}
        </div>
      </section>

      <section className="journey-banner">
        <div>
          <span className="eyebrow">READY TO GO?</span>
          <h2>Let's plan your next journey.</h2>
          <p>Choose your travel mode and plan your trip.</p>
        </div>

        <Link
          to="/transport"
          className="primary-button"
        >
          Plan my trip <ArrowRight size={18} />
        </Link>
      </section>
    </>
  );
}

// DESTINATIONS PAGE

function Destinations() {
  const [searchText, setSearchText] = useState("");

  const filtered = destinations.filter((destination) =>
    `${destination.name} ${destination.country}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  return (
    <main className="page-container">
      <span className="eyebrow">FIND YOUR NEXT ADVENTURE</span>

      <h1 className="page-title">Explore destinations</h1>

      <p className="page-subtitle">
        Discover places to visit and start planning your trip.
      </p>

      <div className="destination-search">
        <Search size={20} />

        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search destinations..."
          aria-label="Search destinations"
        />
      </div>

      {filtered.length > 0 ? (
        <div className="destination-grid">
          {filtered.map((destination) => (
            <DestinationCard
              key={destination.name}
              destination={destination}
            />
          ))}
        </div>
      ) : (
        <p className="empty-state">
          No destinations found. Try another name.
        </p>
      )}
    </main>
  );
}

// TRANSPORT PAGE

function Transport() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(
    location.state?.mode || "bus"
  );

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [searched, setSearched] = useState(false);

  const option =
    transportOptions.find((item) => item.id === selected) ||
    transportOptions[0];

  const SelectedIcon = option.icon;

  function searchTrips(event) {
    event.preventDefault();

    if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
      alert("Departure and destination must be different.");
      return;
    }

    setSearched(true);
  }

  function bookTrip(trip) {
    const booking = {
      id: String(Date.now()),
      mode: option.name,
      from: from.trim(),
      to: to.trim(),
      date,
      passengers: Number(passengers),
      tripName: trip.name,
      departureTime: trip.time,
      amount: trip.price * Number(passengers),
      tripId: trip.id,
    };

    navigate("/payment", {
      state: { booking },
    });
  }

  return (
    <main className="page-container">
      <span className="eyebrow">PLAN YOUR JOURNEY</span>

      <h1 className="page-title">Book your transport</h1>

      <p className="page-subtitle">
        Select your transport, enter your trip details and
        choose a journey.
      </p>

      <div className="transport-grid">
        {transportOptions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              type="button"
              key={item.id}
              className={
                selected === item.id
                  ? "transport-card selected"
                  : "transport-card"
              }
              onClick={() => {
                setSelected(item.id);
                setSearched(false);
              }}
            >
              <Icon size={30} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </button>
          );
        })}
      </div>

      <section className="booking-panel">
        <div className="panel-heading">
          <span className="panel-icon">
            <SelectedIcon size={26} />
          </span>

          <div>
            <h2>Search {option.name}</h2>
            <p>{option.detail}</p>
          </div>
        </div>

        <form
          className="booking-form"
          onSubmit={searchTrips}
        >
          <label>
            Departure location

            <input
              required
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="e.g. Vijayawada"
            />
          </label>

          <label>
            Destination

            <input
              required
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="e.g. Hyderabad"
            />
          </label>

          <label>
            Travel date

            <input
              required
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <label>
            Passengers

            <input
              required
              type="number"
              min="1"
              max="20"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
            />
          </label>

          <button
            className="primary-button search-button"
            type="submit"
          >
            Search journeys <Search size={17} />
          </button>
        </form>
      </section>

      {searched && (
        <section className="results-section">
          <span className="eyebrow">JOURNEY OPTIONS</span>

          <h2>
            {from} <ArrowRight size={21} /> {to}
          </h2>

          <div className="trip-results">
            {trips[selected].map((trip) => (
              <article
                className="trip-result-card"
                key={trip.id}
              >
                <div className="trip-result-info">
                  <h3>{trip.name}</h3>

                  <p>
                    <MapPin size={16} />
                    {from} → {to}
                  </p>

                  <p>
                    <Clock size={16} />
                    Departure: {trip.time}
                  </p>

                  <p>
                    <CalendarDays size={16} />
                    {date}
                  </p>
                </div>

                <div className="trip-result-price">
                  <strong>
                    {money(trip.price * Number(passengers))}
                  </strong>

                  <small>
                    {money(trip.price)} per passenger ·{" "}
                    {passengers} passenger(s)
                  </small>

                  <button
                    className="primary-button"
                    type="button"
                    onClick={() => bookTrip(trip)}
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

// PAYMENT PAGE

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  async function saveBooking(event) {
    event.preventDefault();

    if (!booking) return;

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mode: booking.mode,
          fromLocation: booking.from,
          toLocation: booking.to,
          travelDate: booking.date,
          passengers: booking.passengers,
          tripName: booking.tripName,
          departureTime: booking.departureTime,
          amount: booking.amount,
          paymentMethod,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Booking failed (${response.status})`);
      }

      navigate("/bookings", {
        replace: true,
        state: { notice: "Your booking has been saved successfully!" },
      });
    } catch (error) {
      alert(error.message || "Unable to connect to the backend.");
    }
  }

  if (!booking) {
    return (
      <main className="page-container">
        <div className="empty-state">
          <CreditCard size={42} />
          <h1>No trip selected</h1>
          <p>
            Choose a journey before continuing to checkout.
          </p>

          <Link
            to="/transport"
            className="primary-button"
          >
            Choose a journey <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container payment-page">
      <span className="eyebrow">CHECKOUT</span>

      <h1 className="page-title">Complete your booking</h1>

      <p className="page-subtitle">
        Review your journey and select a payment method.
      </p>

      <div className="checkout-layout">
        <section className="booking-panel">
          <span className="eyebrow">YOUR JOURNEY</span>

          <h2>
            {booking.from} → {booking.to}
          </h2>

          <div className="checkout-detail">
            <Ticket size={21} />
            <div>
              <small>Transport</small>
              <strong>
                {booking.mode} · {booking.tripName}
              </strong>
            </div>
          </div>

          <div className="checkout-detail">
            <CalendarDays size={21} />
            <div>
              <small>Travel date</small>
              <strong>{booking.date}</strong>
            </div>
          </div>

          <div className="checkout-detail">
            <Clock size={21} />
            <div>
              <small>Departure time</small>
              <strong>{booking.departureTime}</strong>
            </div>
          </div>

          <div className="checkout-detail">
            <Users size={21} />
            <div>
              <small>Passengers</small>
              <strong>{booking.passengers}</strong>
            </div>
          </div>

          <div className="checkout-total">
            <span>Total</span>
            <strong>{money(booking.amount)}</strong>
          </div>
        </section>

        <section className="booking-panel">
          <div className="panel-heading">
            <span className="panel-icon">
              <Wallet size={25} />
            </span>

            <div>
              <h2>Payment method</h2>
              <p>Select your preferred method.</p>
            </div>
          </div>

          <form onSubmit={saveBooking}>
            <div className="payment-options">
              {[
                {
                  name: "UPI",
                  description: "UPI",
                  icon: Wallet,
                },
                {
                  name: "Card",
                  description: "Debit or credit card",
                  icon: CreditCard,
                },
                {
                  name: "Net Banking",
                  description: "Online banking",
                  icon: ShieldCheck,
                },
              ].map((method) => {
                const Icon = method.icon;

                return (
                  <label
                    className={
                      paymentMethod === method.name
                        ? "payment-option active"
                        : "payment-option"
                    }
                    key={method.name}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.name}
                      checked={paymentMethod === method.name}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value)
                      }
                    />

                    <Icon size={23} />

                    <span>
                      <strong>{method.name}</strong>
                      <small>{method.description}</small>
                    </span>
                  </label>
                );
              })}
            </div>

            <button
              className="primary-button payment-submit"
              type="submit"
            >
              Save booking <ArrowRight size={17} />
            </button>

            <button
              className="secondary-button full-width"
              type="button"
              onClick={() => navigate("/transport")}
            >
              Back to transport
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

// MY BOOKINGS PAGE

function Bookings() {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadBookings() {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        setErrorMessage("Please log in to view your bookings.");
        return;
      }

      try {
        const response = await fetch("http://localhost:8081/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401 || response.status === 403) {
          setErrorMessage("Your session may have expired. Please log in again.");
          return;
        }

        if (!response.ok) {
          throw new Error(`Could not load bookings (${response.status}).`);
        }

        const data = await response.json();
        const normalized = data.map((item) => ({
          ...item,
          from: item.fromLocation,
          to: item.toLocation,
          date: item.travelDate,
        }));
        setBookings(normalized);
      } catch (error) {
        setErrorMessage(error.message || "Unable to connect to the backend.");
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  async function removeBooking(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/api/bookings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Could not remove booking (${response.status}).`);
      }

      setBookings((current) => current.filter((booking) => booking.id !== id));
    } catch (error) {
      alert(error.message || "Unable to remove booking.");
    }
  }

  return (
    <main className="page-container">
      <span className="eyebrow">YOUR TRAVEL PLANS</span>
      <h1 className="page-title">My bookings</h1>
      <p className="page-subtitle">View the bookings saved to your account.</p>

      {location.state?.notice && (
        <p className="success-notice">{location.state.notice}</p>
      )}

      {loading ? (
        <div className="empty-state"><p>Loading your bookings...</p></div>
      ) : errorMessage ? (
        <div className="empty-state">
          <p>{errorMessage}</p>
          {!localStorage.getItem("token") && (
            <Link to="/login" className="primary-button">Log in</Link>
          )}
        </div>
      ) : bookings.length === 0 ? (
        <div className="empty-state">
          <Ticket size={45} />
          <h2>No bookings yet</h2>
          <p>Your saved bookings will appear here.</p>
          <Link to="/transport" className="primary-button">
            Find a journey <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="saved-bookings">
          {bookings.map((booking) => (
            <article className="saved-booking-card" key={booking.id}>
              <div className="saved-booking-top">
                <span className="booking-status">{booking.status || "Booking saved"}</span>
              </div>
              <h2>{booking.from} → {booking.to}</h2>
              <p>{booking.mode} · {booking.tripName}</p>
              <p><CalendarDays size={16} /> {booking.date}</p>
              <p><Users size={16} /> {booking.passengers} passenger(s)</p>
              <div className="saved-booking-bottom">
                <strong>{money(booking.amount)}</strong>
                <button type="button" className="delete-button" onClick={() => removeBooking(booking.id)}>
                  <Trash2 size={16} /> Remove
                </button>
              </div>
              <small>Payment method: {booking.paymentMethod || "Not selected"}</small>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

// PAGE NOT FOUND

function NotFound() {
  return (
    <main className="page-container empty-state">
      <h1>Page not found</h1>
      <p>Let's get you back to planning your journey.</p>

      <Link to="/" className="primary-button">
        Go home
      </Link>
    </main>
  );
}

// PROTECTED ROUTE

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// APPLICATION ROUTES

function AppLayout() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/destinations"
          element={<Destinations />}
        />
        <Route path="/transport" element={<Transport />} />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}