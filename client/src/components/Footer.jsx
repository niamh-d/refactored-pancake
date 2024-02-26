function Footer() {
  const date = new Date();

  const year = date.getFullYear();

  return (
    <footer className="footer footer-center p-5 bg-base-300 text-base-content">
      <aside>
        <h1 className="text-2xl mb-1">
          <span className="uppercase">kø</span>do&trade;
        </h1>
        <p className="mb-5">Homelife management made easy</p>
        <p>&copy; Niiv Dev OÜ {year}</p>
      </aside>
    </footer>
  );
}

export default Footer;
