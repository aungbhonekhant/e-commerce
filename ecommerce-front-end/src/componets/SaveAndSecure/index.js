import React from 'react';
import './style.css';
import Shield from '../../images/icon/logo192.png';

function SaceAndSecure() {
    return (
        <div className="s2Container">
            <div className="s2ContainerInner">
                <div className="s2Wrap">
                    <div className="s2WrapInner" style={{ background: `url(${Shield}) no-repeat 0 50%`, backgroundSize: "25px 31px" }}>
                        Safe and Secure Payments.
                        Easy returns.
                        100% Authentic products.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SaceAndSecure;
