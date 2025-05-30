import React, { useState } from "react";

const Profileview = () => {
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    address: "Surat, Gujarat",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("/default-avatar.png");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send `profile` and `image` to backend
    console.log("Submitted:", profile, image);
    alert("Profile updated (not saved to DB yet)!");
  };

  return (
    <div style={styles.container}>
      <h2>👤 My Profile</h2>
      <img src={previewUrl} alt="Profile" style={styles.avatar} />
      <input type="file" accept="image/*" onChange={handleImageChange} />

      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Full Name</label>
        <input name="fullName" value={profile.fullName} onChange={handleChange} />

        <label>Email</label>
        <input name="email" value={profile.email} onChange={handleChange} />

        <label>Phone</label>
        <input name="phone" value={profile.phone} onChange={handleChange} />

        <label>Address</label>
        <input name="address" value={profile.address} onChange={handleChange} />

        <label>New Password</label>
        <input name="password" type="password" value={profile.password} onChange={handleChange} />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "450px",
    margin: "30px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    textAlign: "left"
  }
};

export default Profileview;
