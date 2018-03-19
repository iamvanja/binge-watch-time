/* eslint-disable max-len */
import React from 'react'

const PagePrivacy = () =>
  <div className='page privacy'>
    <h1>Privacy Policy</h1>

    <h2>TL:DR;</h2>
    <p>
      Binge Watch Time (BWT) is a 1 person side project developed for fun and author's personal needs. The usual legalese about what happens to your data in the event of hostile takeover for this reason is not applicable. BWT collects minimal personal data (name, email address and hashed password). I will not sell the collected information. I do use cookies and analytics tools.
    </p>

    <h2>Data Collected</h2>
    <p>When you sign up for a BWT account, your name, email address and hashed password is stored in the database.</p>

    <p>When you add shows or mark episodes as watched, this data is saved to the database as well and associated with your account.</p>

    <p>The database is provided by a cloud database provider.</p>

    <p>The service to obtain shows data is <a href='https://www.themoviedb.org/'>themoviedb.org</a>.</p>

    <h2>Data Usage</h2>
    <p>Data is used for authorization and your account association.</p>

    <p>At some point BWT will have notifications, in the form of email or Chrome push notifications. In this case your personal information may be used for those, although notifications will always be opt-in, so you won't suddenly start getting emails or push notifications.</p>

    <p>The show/episode data is used in the product for obvious reasons: to figure out which shows to display, and which episodes to show.</p>

    <p>I won't ever sell your personal data to any third parties.</p>

    <h2>Cookies</h2>
    <p>I use cookies to persist an authentication token, so that when you return to BWT, you don't have to login again. I don't use cookies for any other reason, although Google Analytics adds a cookie as well.</p>

    <h2>Tracking</h2>
    <p>Standard Google Analytics snippet is in BWT, to help me understand how you are using the product. As stated above, it will add a small cookie to distinguish repeat visitors. I do not submit any of the information I have about you to Google Analytics.</p>

  </div>

export default PagePrivacy
