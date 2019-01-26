import React from 'react';
import './index.css';



const Header = () =>
    (<header>
        <h1 className="header">
            Блог Никиты
        </h1>
        <div className="contacts">
            <div className="contacts-network">
                <a href="mailto:nikita.grigoriew00@gmail.com">
                    E-mail
                </a>
            </div>
            <div className="contacts-network">
                <a
                    href="https://t.me/sweetnik"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Telegram
                </a>
            </div>
        </div>
    </header>);



export default Header;