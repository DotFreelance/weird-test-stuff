// Modules.
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

// Styles.
import './NavBar.scss';

// Constants.
import routes from '../../routes';

function NavBar({ currentRoute }) {
    const menu = useRef(null);
    useEffect(() => {
        const menuBar = menu.current;
        function handler(e) {
            console.log(e.target.scrollLeft);
        }
        menuBar.addEventListener('scroll', handler);
        return () => {
            menuBar.removeEventListener('scroll', handler);
        };
    }, []);

    return (
        <div className="NavBar">
            <ul ref={menu}>
                {
                    routes.map((route, key) => {
                        return (
                            <li key={ key } className={classnames({ selected: route.path === routes[currentRoute].path })}>
                                <Link to={ route.path }>
                                    <h1>{ route.name }</h1>
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default NavBar;