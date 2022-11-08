// generates a variable-length HTML string
const generateRandomHtml = (max) =>
  {
    const length = Math.floor(Math.random(max));
    
    `${[...Array(length)]
    .map(
      () =>
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus dicta id, tempora rem accusamus ab ex, ratione ad exercitationem libero laudantium fugit reiciendis corrupti quis ipsam dolorum maxime perspiciatis nemo."
    )
    .join("")}`;
}