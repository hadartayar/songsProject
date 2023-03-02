import "./Components/style.css";
import "./App.css";
import HomePage from "./Components/HomePage";
import ViewIngredientsPage from "./Components/ViewIngredientsPage";
import IngredientOfRecipePage from "./Components/IngredientOfRecipePage";
import IngredientForm from "./Components/IngredientForm";
import ResponsiveAppBar from "./Components/ResponsiveAppBar"
import RecipeForm from "./Components/RecipeForm";
import { Routes, Route } from "react-router-dom";

function App() {  
  return (
    <div>
      <ResponsiveAppBar/>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/RecipeForm" element={<RecipeForm />} />
          <Route path="/IngredientForm" element={<IngredientForm />}/>
          <Route path="/ViewIngredients" element={<ViewIngredientsPage />} />
          <Route path="/IngredientOfRecipe" element={<IngredientOfRecipePage />} />
        </Routes>
    </div>
  );
}
export default App;
