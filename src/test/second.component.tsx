


const SecondComponent = () => {
    
    const name = 'Khoa';
    const age = 26;

    const infos = {
        name: 'Khoa',
        age: 20
    }


    //jsx, tsx
    return(
        <div className="">
            <div className="">
                Second Component
            </div>
            {/* <h1>Hello: name: {infos.name}, age: {infos.age}</h1> */}
            <h1 style={{
                borderRadius: '10px',
                border: '1px solid',
                borderColor: 'aliceblue',
                color: 'lightblue',
            }}>Hello: { JSON.stringify(infos)}</h1>

            <h1>Hedy Lamarr's Todos</h1>

            
            <img
                src="https://i.imgur.com/yXOvdOSs.jpg"
                alt="Hedy Lamarr"
                className="photo"
            />
            <ul>
                <li>Invent new traffic lights </li>
                <li>Rehearse a movie scene </li>
                <li>Improve the spectrum technology </li>
            </ul>
        </div>
    )
}

export default SecondComponent;