// ─────────────────────────────────────────────────────────────
// CENTRAL BUSINESS CONFIGURATION
// Every contact detail used across the site is read from here.
// Edit this file directly to update any business detail — there
// is no admin CMS for this by design; the site owner is
// comfortable editing this file in code.
// ─────────────────────────────────────────────────────────────

const businessInfo = {
  name: "Hussaini Glass",
  tagline: "Glass, Aluminium, Interiors & Fabrication Solutions",
  location: "Hyderabad, Telangana, India",

  phone: "+91 9291250090",
  whatsapp: "919291250090",
  email: "hussainiglasshyd@gmail.com",

  address:
    "SBH Colony, Vijaya Nagar Colony, 270/3RT, Vijaynagar Colony, SBH Colony, Vijaya Nagar Colony, Hyderabad, Telangana 500057",
  landmark: "Opposite Owaisi Park",

  googleMapsUrl:
    "https://www.google.com/maps/place/Owaisi+Park/@17.3921987,78.4519897,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb976d6fd412ad:0xe1e3f5810891ecc3!8m2!3d17.3921936!4d78.4545646!16s%2Fg%2F11gdgbyspj?entry=ttu&g_ep=EgoyMDI2MDkwOC4wIKXMDSoASAFQAw%3D%3D",

  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.407962439007!2d78.45198967515518!3d17.392198702666562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb976d6fd412ad%3A0xe1e3f5810891ecc3!2sOwaisi%20Park!5e0!3m2!1sen!2sin!4v1789128406357!5m2!1sen!2sin",

  businessHours: "Monday to Saturday: 10:30 AM – 9:00 PM",
};

export default businessInfo;

// Builds a wa.me link with a pre-filled message.
export function waLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${businessInfo.whatsapp}?text=${text}`;
}

export function telLink() {
  return `tel:${businessInfo.phone.replace(/\s+/g, "")}`;
}

export function mailLink(subject = "") {
  return subject
    ? `mailto:${businessInfo.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${businessInfo.email}`;
}

export const defaultWhatsAppMessage =
  "Hello Hussaini Glass, I found your website and would like to know more about your services.";

export function serviceWhatsAppMessage(serviceName) {
  return `Hello Hussaini Glass, I am interested in ${serviceName}. I would like to know more and get a quote.`;
}
