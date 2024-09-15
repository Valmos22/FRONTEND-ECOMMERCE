<script>
  import Navbar from "../components/Navbar.svelte";
  import Footer from "../components/Footer.svelte";
  import Banner from "../components/Banner.svelte";
  import "../app.css";
</script>

<header>
  <Navbar />
  <Banner />
</header>

<main class="flex-grow">
  <slot />
</main>

<footer>
  <Footer />
</footer>
