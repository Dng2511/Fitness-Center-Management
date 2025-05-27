import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useEffect, useState } from 'react'

ChartJS.register(ArcElement, Tooltip, Legend)

const EquipmentChart = ({ equipmentData = [] }) => {
    const [chartData, setChartData] = useState({
        labels: ['Cardio', 'Strength', 'Free Weights', 'Accessories', 'Other'],
        datasets: [{
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
        }],
    })

    useEffect(() => {
        // Calculate equipment distribution
        const distribution = {
            'Cardio': 0,
            'Strength': 0,
            'Free Weights': 0,
            'Accessories': 0,
            'Other': 0
        }

        equipmentData.forEach(item => {
            if (distribution.hasOwnProperty(item.type)) {
                distribution[item.type]++
            } else {
                distribution['Other']++
            }
        })

        setChartData(prev => ({
            ...prev,
            datasets: [{
                ...prev.datasets[0],
                data: [
                    distribution['Cardio'],
                    distribution['Strength'],
                    distribution['Free Weights'],
                    distribution['Accessories'],
                    distribution['Other']
                ]
            }]
        }))
    }, [equipmentData])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle',
                }
            },
            title: {
                display: true,
                text: 'Equipment Distribution',
                font: {
                    size: 16,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        }
    }

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <Pie data={chartData} options={options} />
        </div>
    )
}

export default EquipmentChart 