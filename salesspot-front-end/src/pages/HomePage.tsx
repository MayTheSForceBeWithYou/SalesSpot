import axios from "axios";

const HomePage = () => {
    const handleClick = async () => {
        console.log('Handling click...');
        const response = await axios.get(`http://localhost:8000/api/test`);
        console.log(`response: ${JSON.stringify(response, null, 2)}`);
    };
    
    return (
        <>
        <h1>Home</h1>
        
        <label>Test Server Connection</label>
        <button onClick={handleClick}>Test</button>
        </>
    );
};

export default HomePage;