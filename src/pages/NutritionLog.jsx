import React, { useState, useEffect } from 'react';

const NutritionLog = () => {
  const [foodItem, setFoodItem] = useState('');
  const [mealType, setMealType] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [tags, setTags] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [meals, setMeals] = useState([]);

  const token = localStorage.getItem('token');

  const fetchMeals = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/nutrition-log/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setMeals(data);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchMeals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const entry = {
      foodItem,
      mealType,
      calories,
      protein,
      carbs,
      fat,
      servingSize,
      tags,
      dateTime: dateTime || new Date().toISOString(),
    };

    try {
      const res = await fetch('http://localhost:5000/api/nutrition-log/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(entry),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage(data.message || 'Meal saved successfully!');
        setFoodItem('');
        setMealType('');
        setCalories('');
        setProtein('');
        setCarbs('');
        setFat('');
        setServingSize('');
        setTags('');
        setDateTime('');
        fetchMeals();
      } else {
        throw new Error(data.message || 'Error saving meal');
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleClearLogs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/nutrition-log/clear', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setMeals([]);
        setSuccessMessage(data.message);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setErrorMessage('Failed to clear logs');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <h2 style={styles.heading}>Log Your Meal</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input style={styles.input} type="text" placeholder="Food Item" value={foodItem} onChange={(e) => setFoodItem(e.target.value)} required />
          <input style={styles.input} type="text" placeholder="Meal Type (Breakfast, Lunch...)" value={mealType} onChange={(e) => setMealType(e.target.value)} required />
          <input style={styles.input} type="number" placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} required />
          <input style={styles.input} type="number" placeholder="Protein (g)" value={protein} onChange={(e) => setProtein(e.target.value)} />
          <input style={styles.input} type="number" placeholder="Carbs (g)" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
          <input style={styles.input} type="number" placeholder="Fat (g)" value={fat} onChange={(e) => setFat(e.target.value)} />
          <input style={styles.input} type="text" placeholder="Serving Size (e.g., 1 cup)" value={servingSize} onChange={(e) => setServingSize(e.target.value)} />
          <input style={styles.input} type="text" placeholder="Tags (e.g., High Protein, Junk Food)" value={tags} onChange={(e) => setTags(e.target.value)} />
          <input style={styles.input} type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />

          <button type="submit" style={styles.button}>Save Meal</button>
        </form>

        {successMessage && <p style={styles.success}>{successMessage}</p>}
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}

        <div style={styles.tableContainer}>
          <div style={styles.tableHeader}>
            <h3 style={styles.heading}>🍽️ Your Nutrition Logs</h3>
            {meals.length > 0 && <button onClick={handleClearLogs} style={styles.clearButton}>Clear All Logs</button>}
          </div>

          {meals.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Food</th><th>Type</th><th>Calories</th><th>Protein</th><th>Carbs</th><th>Fat</th><th>Serving</th><th>Tags</th><th>Date</th>
                </tr>
              </thead>
              <tbody>
                {meals.map((meal, index) => (
                  <tr key={index}>
                    <td>{meal.foodItem}</td>
                    <td>{meal.mealType}</td>
                    <td>{meal.calories}</td>
                    <td>{meal.protein}g</td>
                    <td>{meal.carbs}g</td>
                    <td>{meal.fat}g</td>
                    <td>{meal.servingSize}</td>
                    <td>{meal.tags}</td>
                    <td>{new Date(meal.dateTime).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={styles.noMeals}>No meals logged yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 0',
    fontFamily: 'Poppins, sans-serif',
    backgroundImage: 'url("/images/Workout page2.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    maxWidth: '900px',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '10px',
  },
  heading: {
    fontSize: '2rem',
    color: '#fff',
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  },
  input: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: 'none',
    outline: 'none',
  },
  button: {
    padding: '12px',
    fontSize: '1rem',
    backgroundColor: '#ff6347',
    color: '#fff',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
  },
  success: {
    marginTop: '10px',
    color: 'limegreen',
    textAlign: 'center',
  },
  error: {
    marginTop: '10px',
    color: 'red',
    textAlign: 'center',
  },
  tableContainer: {
    marginTop: '40px',
    width: '100%',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    color: '#fff',
  },
  clearButton: {
    backgroundColor: '#dc3545',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
  },
  noMeals: {
    textAlign: 'center',
    color: 'gray',
  },
};

export default NutritionLog;
