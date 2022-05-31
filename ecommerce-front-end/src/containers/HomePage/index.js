import React from 'react'
import Layout from '../../componets/Layout';

function HomePage() {
    return (
        <Layout menuheader={true} more={true} cart={true} search={true} login={true}>
            Home Page
        </Layout>
    )
}

export default HomePage
