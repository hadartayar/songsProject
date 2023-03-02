using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Configuration;
using System.Web.Http;

namespace Pro3ServerSide.Models.DAL
{
    public class DBServices
    {
        public DBServices()
        {

        }

        //--------------------------------------------------------------------------------------------------
        // This method creates a connection to the database according to the connectionString name in the web.config 
        //--------------------------------------------------------------------------------------------------
        public SqlConnection connect(String conString)
        {

            // read the connection string from the configuration file
            string cStr = WebConfigurationManager.ConnectionStrings[conString].ConnectionString;
            SqlConnection con = new SqlConnection(cStr);
            con.Open();
            return con;
        }

        //---------------------------------------------------------------------------------
        // Create the SqlCommand
        //---------------------------------------------------------------------------------
        private SqlCommand CreateCommand(String CommandSTR, SqlConnection con)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = CommandSTR;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.Text; // the type of the command, can also be stored procedure

            return cmd;
        }

        //--------------------------------------------------------------------
        // Ingredients:
        //--------------------------------------------------------------------
        public List<Ingredient> GetIngredients()
        {
            SqlConnection con = null;
            SqlCommand cmd;
            try
            {
                con = connect("DBConnectionString"); // create the connection
                List<Ingredient> ingredientList = new List<Ingredient>();
                String selectSTR = "SELECT * FROM Ingredients_2022";
                cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                while (dr.Read())
                {
                    Ingredient ing = new Ingredient();
                    ing.Id = Convert.ToInt32(dr["ID"]);
                    ing.Name = (string)dr["Ing_Name"];
                    ing.Image = (string)dr["Img_url"];
                    ing.Calories = Convert.ToInt32(dr["Calories"]);
                    ingredientList.Add(ing);
                }
                return ingredientList;
            }

            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }

        public int InsertIngredient(Ingredient ing)
        {
            {
                SqlConnection con;
                SqlCommand cmd;

                try
                {
                    con = connect("DBConnectionString"); // create the connection
                }
                catch (Exception ex)
                {
                    // write to log
                    throw (ex);
                }

                String cStr = BuildInsertIngredientCommand(ing);      // helper method to build the insert string

                cmd = CreateCommand(cStr, con);             // create the command

                try
                {
                    int numEffected = cmd.ExecuteNonQuery(); // execute the command
                    return numEffected;
                }
                catch (Exception ex)
                {
                    // write to log
                    throw (ex);
                }

                finally
                {
                    if (con != null)
                    {
                        // close the db connection
                        con.Close();
                    }
                }
            }
        }

        private String BuildInsertIngredientCommand(Ingredient ing)
        {
            String command;
            StringBuilder sb = new StringBuilder();
            // use a string builder to create the dynamic string
            sb.AppendFormat("Values('{0}', '{1}', {2})", ing.Name, ing.Image, ing.Calories);
            String prefix = "INSERT INTO Ingredients_2022 " + "([Ing_Name], [Img_url], [Calories])";
            command = prefix + sb.ToString();
            return command;
        }


        //--------------------------------------------------------------------
        // Recipes:
        //--------------------------------------------------------------------
        public List<Recipe> GetRecipes()
        {
            SqlConnection con = null;
            SqlCommand cmd;
            try
            {
                con = connect("DBConnectionString"); // create the connection
                List<Recipe> recipesList = new List<Recipe>();
                String selectSTR = "SELECT * FROM Recipes_2022";
                cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                while (dr.Read())
                {
                    Recipe r = new Recipe();
                    r.Id = Convert.ToInt32(dr["ID"]);
                    r.Name = (string)dr["Rec_Name"];
                    r.Image = (string)dr["Img_url"];
                    r.CookingMethod = (string)dr["Cooking_Method"];
                    r.Time = Convert.ToInt32(dr["Cooking_Time"]);
                    recipesList.Add(r);
                }
                return recipesList;
            }

            catch (Exception ex)
            {
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }
            }
        }
        //Get number of recipes in the arr, to know the mext Id of new recipe
        //public int GetNumOfRecipes(int num)
        //{
        //    int length = 0;
        //    SqlConnection con = null;
        //    SqlCommand cmd;
        //    try
        //    {
        //        con = connect("DBConnectionString"); // create the connection
        //        List<Recipe> recipesList = new List<Recipe>();
        //        String selectSTR = "select count(*) from Recipes_2022";
        //        cmd = new SqlCommand(selectSTR, con);

        //        // get a reader
        //        SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
        //        length = Convert.ToInt32(dr["Count"]);
        //        return length;
        //    }

        //    catch (Exception ex)
        //    {
        //        throw (ex);
        //    }
        //    finally
        //    {
        //        if (con != null)
        //        {
        //            con.Close();
        //        }
        //    }
        //}
        public int InsertRecipe(Recipe rec)
        {
            {
                SqlConnection con;
                SqlCommand cmd;

                try
                {
                    con = connect("DBConnectionString"); // create the connection
                }
                catch (Exception ex)
                {
                    throw (ex);
                }

                String cStr = BuildInsertRecipeCommand(rec);      // helper method to build the insert string

                cmd = CreateCommand(cStr, con);             // create the command

                try
                {
                    int numEffected = cmd.ExecuteNonQuery(); // execute the command
                    return numEffected;
                }
                catch (Exception ex)
                {
                    throw (ex);
                }

                finally
                {
                    if (con != null)
                    {
                        con.Close();
                    }
                }
            }
        }

        private String BuildInsertRecipeCommand(Recipe rec)
        {
            String command;
            StringBuilder sb = new StringBuilder();
            // use a string builder to create the dynamic string
            sb.AppendFormat(" Values({0}, '{1}', '{2}', '{3}', {4})", rec.Id, rec.Name, rec.Image, rec.CookingMethod, rec.Time);
            String prefix = "INSERT INTO Recipes_2022 " + "([ID], [Rec_Name], [Img_url], [Cooking_Method], [Cooking_Time])";
            command = prefix + sb.ToString();
            return command;
        }

        //--------------------------------------------------------------------
        // Get the specific recipe ingredients
        //--------------------------------------------------------------------
        public List<Ingredient> GetRecipeIngredients(int recipeId)
        {
            SqlConnection con = null;
            SqlCommand cmd;
            try
            {
                con = connect("DBConnectionString"); // create the connection
                List<Ingredient> ingredientList = new List<Ingredient>();
                String selectSTR = "select Ingredient_ID, Ing_Name, Img_url,Calories from Recipes_Ingredients_2022 " +
                    "inner join Ingredients_2022 on Recipes_Ingredients_2022.Ingredient_ID= Ingredients_2022.ID WHERE Recipe_ID= " + recipeId;

                cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                while (dr.Read())
                {
                    Ingredient ing = new Ingredient();
                    ing.Id = Convert.ToInt32(dr["Ingredient_ID"]);
                    ing.Name = (string)dr["Ing_Name"];
                    ing.Image = (string)dr["Img_url"];
                    ing.Calories = Convert.ToInt32(dr["Calories"]);
                    ingredientList.Add(ing);
                }
                return ingredientList;
            }

            catch (Exception ex)
            {
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }
            }
        }


        public int InsertToRecipe_Ing(int recId, int ingId)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("DBConnectionString"); // create the connection
            }
            catch (Exception ex)
            {
                throw (ex);
            }

            String cStr = BuildInsertRecipeIngCommand(recId, ingId);      // helper method to build the insert string

            cmd = CreateCommand(cStr, con);             // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                DeleteRecipe(recId);
                //If we add already to the Recipes_2022 and fail add to the mutual table, we delete the recipe from Recipes_2022
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    con.Close();
                }
            }
        }

        private String BuildInsertRecipeIngCommand(int recId, int ingId)
        {
            String command;
            StringBuilder sb = new StringBuilder();
            // use a string builder to create the dynamic string
            sb.AppendFormat("Values({0}, {1})", recId, ingId);
            String prefix = "INSERT INTO Recipes_Ingredients_2022 " + "([Recipe_ID], [Ingredient_ID])";
            command = prefix + sb.ToString();
            return command;
        }

        public int DeleteRecipe(int recId)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("DBConnectionString"); // create the connection
            }
            catch (Exception ex)
            {
                throw (ex);
            }

            String cStr = BuildDeleteCommand(recId);      // helper method to build the insert string

            cmd = CreateCommand(cStr, con);             // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    con.Close();
                }
            }
        }

        //--------------------------------------------------------------------
        // Build the DELETE command String///
        //--------------------------------------------------------------------
        private String BuildDeleteCommand(int recId)
        {
            String command;
            command = "DELETE from Recipes_2022 WHERE ID= " + recId;
            return command;
        }
    }
}