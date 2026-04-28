import Image from 'next/image';
import Gallery from '@/components/Gallery';

export default function HomePage() {
  return (
    <main className="container">
      <header className="header">
        {/* Company Logo Section */}
        <div className="logo-container">
          <Image 
            src="/diversition-logo.png" 
            alt="Diversition Digital Solutions" 
            width={240} 
            height={60} 
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>
        
        <h1>Photo Gallery</h1>
        <p>Browse the collection — click any <strong>#hashtag</strong> to filter images</p>
      </header>
      <Gallery />
    </main>
  );
}
