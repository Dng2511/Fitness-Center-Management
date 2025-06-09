import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export default function MemberChart({ data }) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 12
                    }
                }
            },
            title: {
                display: true,
                text: 'Member Growth Trends',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    callback: function (value) {
                        return value + ' members'
                    }
                }
            }
        }
    }

    const chartData = {
        labels: Object.keys(data?.monthlyMembers || {}),
        datasets: [
            {
                label: 'Active Members',
                data: Object.values(data?.monthlyMembers || {}),
                backgroundColor: 'rgba(34, 197, 94, 0.6)',
                borderColor: 'rgba(34, 197, 94, 1)',
                borderWidth: 1,
                borderRadius: 4,
                hoverBackgroundColor: 'rgba(34, 197, 94, 0.8)'
            },
            {
                label: 'New Registrations',
                data: Object.values(data?.monthlyNewMembers || {}),
                backgroundColor: 'rgba(79, 70, 229, 0.6)',
                borderColor: 'rgba(79, 70, 229, 1)',
                borderWidth: 1,
                borderRadius: 4,
                hoverBackgroundColor: 'rgba(79, 70, 229, 0.8)'
            }
        ]
    }

    return (
        <div className="member-chart-container">
            <Bar options={options} data={chartData} height={300} />
        </div>
    )
} 