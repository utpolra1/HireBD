import React from 'react';

const MostOrder = () => {
    const gigs = [
        { id: 1, title: 'Gig 1', description: 'Description of gig 1' },
        { id: 2, title: 'Gig 2', description: 'Description of gig 2' },
        { id: 3, title: 'Gig 3', description: 'Description of gig 3' },
        { id: 4, title: 'Gig 4', description: 'Description of gig 4' }
    ];

    return (
        <div>
            <h2>Most Ordered Gigs</h2>
            <ul>
                {gigs.map(gig => (
                    <li key={gig.id}>
                        <h3>{gig.title}</h3>
                        <p>{gig.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MostOrder;
