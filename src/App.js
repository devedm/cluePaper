import { useEffect, useState } from "react";

const suspects = ["Verdi", "Mostaza", "Azulino", "Moradillo", "Escarlata", "Blanco"]; const weapons = ["Llave Inglesa", "Candelabro", "Daga", "Pistola", "Tubería", "Soga"]; const rooms = ["Baño", "Estudio", "Comedor", "Salón de Juegos", "Garaje", "Habitación", "Sala", "Cocina", "Patio"];

const categories = [ { title: "SOSPECHOSOS", items: suspects }, { title: "ARMAS", items: weapons }, { title: "LUGAR", items: rooms }, ];

export default function ClueScorecard() { const [data, setData] = useState({});

useEffect(() => { const savedData = localStorage.getItem("clueScorecard"); if (savedData) setData(JSON.parse(savedData)); }, []);

useEffect(() => { localStorage.setItem("clueScorecard", JSON.stringify(data)); }, [data]);

const toggleCell = (category, item, playerIndex) => { const key = ${category}-${item}-${playerIndex}; setData(prev => ({ ...prev, [key]: !prev[key] })); };

return ( <div className="p-4 max-w-4xl mx-auto"> <h1 className="text-2xl font-bold mb-4 text-center">Clue Scorecard</h1> {categories.map((section) => ( <div key={section.title} className="mb-6"> <h2 className="text-xl font-semibold text-blue-700 border-b border-blue-700 mb-2"> {section.title} </h2> <table className="w-full table-auto border"> <thead> <tr> <th className="border p-2 text-left">{section.title}</th> {[...Array(6)].map((, i) => ( <th key={i} className="border p-2 text-center">P{i + 1}</th> ))} </tr> </thead> <tbody> {section.items.map(item => ( <tr key={item}> <td className="border p-2 font-medium text-gray-700">{item}</td> {[...Array(6)].map((, i) => { const key = ${section.title}-${item}-${i}; const isChecked = data[key]; return ( <td key={i} className="border p-2 text-center cursor-pointer hover:bg-blue-100" onClick={() => toggleCell(section.title, item, i)} > {isChecked ? "✔️" : ""} </td> ); })} </tr> ))} </tbody> </table> </div> ))} </div> ); }

