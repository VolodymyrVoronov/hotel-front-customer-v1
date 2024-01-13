const GoogleMap = (): JSX.Element => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423284.0440924698!2d-118.74137159485794!3d34.02060847069953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2z0JvQvtGBLdCQ0L3QtNC20LXQu9C10YEsINCa0LDQu9C40YTQvtGA0L3QuNGPLCDQodCo0JA!5e0!3m2!1sru!2sde!4v1705147410179!5m2!1sru!2sde"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Google Maps"
    ></iframe>
  );
};

export default GoogleMap;
