import React from 'react';
import chatIcon from '../assets/icon-chat.png';
import moneyIcon from '../assets/icon-money.png';
import securityIcon from '../assets/icon-security.png';
import FeatureItem from './featureItem';

function HomeMain() {
    return(
      <div className='screen'>
        <main>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
         <FeatureItem
            iconSrc={chatIcon}
            title="You are our #1 priority"
            description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
          />
          <FeatureItem
            iconSrc={moneyIcon}
            title="More savings means higher rates"
            description="The more you save with us, the higher your interest rate will be!"
          />
          <FeatureItem
            iconSrc={securityIcon}
            title="Security you can trust"
            description="We use top of the line encryption to make sure your data and money is always safe."
          />
      </section>
    </main>
      </div>
        
    );
}

export default HomeMain;