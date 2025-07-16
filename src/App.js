import { useEffect, useState } from "react";

const suspects = ["Verdi", "Mostaza", "Azulino", "Moradillo", "Escarlata", "Blanco"];
const weapons = ["Llave Inglesa", "Candelabro", "Daga", "Pistola", "Tubería", "Soga"];
const rooms = [
  "Baño", "Estudio", "Comedor", "Salón de Juegos",
  "Garaje", "Habitación", "Sala", "Cocina", "Patio"
];

const categories = [
  { title: "SOSPECHOSOS", items: suspects },
  { title: "ARMAS", items: weapons },
  { title: "LUGAR", items: rooms },
];

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "24px"
};

const thTdStyle = {
  border: "1px solid #444",
  padding: "8px",
  textAlign: "center"
};

const thLeftStyle = {
  ...thTdStyle,
  textAlign: "left",
  fontWeight: "bold"
};

const headerStyle = {
  fontWeight: "bold",
  fontSize: "1.25rem",
  color: "#003366",
  borderBottom: "2px solid #003366",
  paddingBottom: "4px",
  marginBottom: "12px"
};

const containerStyle = {
  maxWidth: "800px",
  margin: "20px auto",
  padding: "0 16px",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
};

const cursorPointer = {
  cursor: "pointer"
};

const hoverStyle = {
  backgroundColor: "#cce4ff"
};

export default function ClueScorecard() {
  const [data, setData] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem("clueScorecard");
    if (savedData) setData(JSON.parse(savedData));
  }, []);

  useEffect(() => {
    localStorage.setItem("clueScorecard", JSON.stringify(data));
  }, [data]);

  const toggleCell = (category, item, playerIndex) => {
    const key = `${category}-${item}-${playerIndex}`;
    setData(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "24px" }}>
        Clue Scorecard
      </h1>

      {categories.map((section) => (
        <div key={section.title}>
          <h2 style={headerStyle}>{section.title}</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thLeftStyle}>{section.title}</th>
                {[...Array(6)].map((_, i) => (
                  <th key={i} style={thTdStyle}>P{i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.items.map(item => (
                <tr key={item}>
                  <td style={{ ...thTdStyle, textAlign: "left", fontWeight: "600", color: "#555" }}>
                    {item}
                  </td>
                  {[...Array(6)].map((_, i) => {
                    const key = `${section.title}-${item}-${i}`;
                    const isChecked = data[key];
                    return (
                      <td
                        key={i}
                        style={{ 
                          ...thTdStyle, 
                          ...cursorPointer,
                          ...(isChecked ? { backgroundColor: "#d0eaff" } : {}),
                        }}
                        onClick={() => toggleCell(section.title, item, i)}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#cce4ff"}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = isChecked ? "#d0eaff" : ""}
                      >
                        {isChecked ? "✔️" : ""}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
