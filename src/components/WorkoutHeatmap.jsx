import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css'; // Default styles (required for structure)
import '../styles/HeatmapCustom.css'; // Custom dark theme override

const WorkoutHeatmap = ({ data }) => {
  // Transform workout data to match heatmap format
  const today = new Date();
  const startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 3); // Show last 3 months

  const formattedData = data.map((item) => ({
    date: new Date(item.date).toISOString().split('T')[0],
    count: item.caloriesBurned || 1,
  }));

  return (
    <div className="heatmap-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h3 style={{ color: 'white', marginBottom: '10px' }}>🔥 Workout Calendar</h3>
      <CalendarHeatmap
        startDate={startDate}
        endDate={today}
        values={formattedData}
        showWeekdayLabels={true}
        gutterSize={3}
        classForValue={(value) => {
          if (!value || value.count === 0) return 'color-empty';
          if (value.count < 100) return 'color-scale-1';
          if (value.count < 300) return 'color-scale-2';
          return 'color-scale-3';
        }}
        transformDayElement={(rect, _value) => {
          return React.cloneElement(rect, {
            rx: 4,
            ry: 4,
          });
        }}
      />
    </div>
  );
};

export default WorkoutHeatmap;
