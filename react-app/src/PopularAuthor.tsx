import { useState, useEffect } from "react";

export function PopularAuthor() {
  const [authors, setAuthors] = useState<Array<{
    id: string;
    firstName: string;
    lastName: string;
  }>>([]);

  
  useEffect(() => {
    fetch("http://localhost:3000/authors")
      .then((res) => res.json())
      .then((data) => {
        const allAuthors = data.data;
        if (!allAuthors || allAuthors.length === 0) return;

        
        const shuffled = allAuthors.sort(() => 0.5 - Math.random());
        const threeRandomAuthors = shuffled.slice(0, 3);

        setAuthors(threeRandomAuthors);
      })
      .catch((err) =>
        console.error("Erreur lors du chargement des auteurs :", err)
      );
  }, []);

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* En-tête */}
      <div
        style={{
          padding: "10px 40px",
          backgroundColor: "#222831",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            color: "white",
            margin: "0",
            fontSize: "25px",
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          Popular Authors
        </h2>
      </div>
      {/* Authors Bar */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          backgroundColor: "#222831",
          justifyContent: "stretch",
          alignItems: "center",
          minHeight: "80px",
          width: "100%",
          flexWrap: "nowrap",
        }}
      >
        {authors.map((author) => (
          <button
            key={author.id}
            style={{
              padding: "15px 15px",
              boxSizing: "border-box",
              backgroundColor: "#646262ff",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontSize: "20px",
              fontWeight: "bold",
              flex: "1 1 0",
              height: "200px",
              display: "flex",
              alignItems: "center",
              transition: "all 0.5s ease",
              minWidth: "0",
              transform: "scale(0.95)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#c7c6c6ff";
              e.currentTarget.style.transform = "scale(1.00)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#646262ff";
              e.currentTarget.style.transform = "scale(0.95)";
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
                whiteSpace: "normal",
                overflowWrap: "break-word",
              }}
            >
              <span>Prénom : {author.firstName}</span>
              <span>Nom : {author.lastName}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
