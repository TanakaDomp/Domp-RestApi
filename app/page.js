import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [backgroundImage, setBackgroundImage] = useState('https://f.top4top.io/p_3213cnhm01.jpg'); // Ganti dengan URL gambar yang diinginkan

  const changeBackground = (url) => {
    setBackgroundImage(url);
  };

  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      padding: '20px',
      transition: 'background-image 0.5s ease-in-out'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Hellooo Welcome!!!</h1>
      <Link href="/docs">
        <a style={{
          padding: '10px 20px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          color: '#333',
          borderRadius: '5px',
          textDecoration: 'none',
          fontSize: '1.5rem',
          transition: 'background-color 0.3s ease',
        }}>
          Try Ke Docs Page!
        </a>
      </Link>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="https://f.top4top.io/p_3213cnhm01.jpg"
          onBlur={(e) => changeBackground(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginTop: '10px',
            width: '300px',
            fontSize: '1rem'
          }}
        />
      </div>
    </div>
  );
}
