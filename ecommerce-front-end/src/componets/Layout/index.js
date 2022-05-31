import React from 'react'
import Header from '../Header'
import MenuHeader from '../MenuHeader'

function Layout(props) {
    return (
        <>
            <div style={{ marginBottom: "16px" }}>
                <Header cart={props.cart} more={props.more} search={props.search} login={props.login} />
                {
                    props.menuheader && <MenuHeader />
                }
            </div>
            {props.children}
        </>
    )
}

export default Layout
