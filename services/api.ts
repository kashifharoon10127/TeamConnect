export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    company: {
        name: string;
    };
}

export interface RecentMessage {
    id: number;
    user: string;
    text: string;
    time: string;
}

export interface CallLog {
    id: number;
    user: string;
    type: 'incoming' | 'outgoing' | 'missed';
    duration: string;
    time: string;
}

export async function getUsers(): Promise<User[]> {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export async function getRecentMessages(): Promise<RecentMessage[]> {
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, user: 'Alice Johnson', text: 'Hey, are you free later?', time: '2m ago' },
                { id: 2, user: 'Bob Smith', text: 'Files have been uploaded.', time: '1h ago' },
                { id: 3, user: 'Charlie Brown', text: 'Thanks for the update!', time: '3h ago' },
                { id: 4, user: 'Team Lead', text: 'Meeting starts in 10.', time: '5h ago' },
                { id: 5, user: 'Sarah Khan', text: 'Can you review my PR?', time: '10m ago' },
                { id: 6, user: 'David Miller', text: 'Client feedback received.', time: '30m ago' },
                { id: 7, user: 'Project Manager', text: 'Deadline extended by 2 days.', time: '45m ago' },
                { id: 8, user: 'UI Designer', text: 'New design mockups are ready.', time: '1h ago' },
                { id: 9, user: 'QA Team', text: 'Bug report shared in Slack.', time: '2h ago' },
                { id: 10, user: 'Ahmed Raza', text: 'Please check your email.', time: '2h ago' },
                { id: 11, user: 'Support Bot', text: 'Your ticket has been resolved.', time: '3h ago' },
                { id: 12, user: 'HR Dept', text: 'Reminder: submit your timesheet.', time: '4h ago' },
                { id: 13, user: 'Finance Team', text: 'Invoice has been generated.', time: '5h ago' },
                { id: 14, user: 'Marketing Lead', text: 'Campaign goes live tomorrow.', time: '6h ago' },
                { id: 15, user: 'Ali Hassan', text: 'Can we sync after lunch?', time: '7h ago' },
                { id: 16, user: 'DevOps', text: 'Server maintenance tonight.', time: '8h ago' },
                { id: 17, user: 'Product Owner', text: 'Sprint planning at 3 PM.', time: '9h ago' },
                { id: 18, user: 'Zara Sheikh', text: 'Great job on the release!', time: '10h ago' },
                { id: 19, user: 'Tech Lead', text: 'Code freeze starts today.', time: '12h ago' },
                { id: 20, user: 'System', text: 'Backup completed successfully.', time: '1d ago' },


            ]);
        }, 100);
    });
}

export async function getCallLogs(): Promise<CallLog[]> {
    // Simulating API latency
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, user: 'Alice Johnson', type: 'incoming', duration: '5m 23s', time: '10m ago' },
                { id: 2, user: 'Unknown Number', type: 'missed', duration: '0s', time: '2h ago' },
                { id: 3, user: 'Bob Smith', type: 'outgoing', duration: '12m 4s', time: '1d ago' },
                { id: 4, user: 'Support', type: 'incoming', duration: '2m 10s', time: '1d ago' },
                { id: 5, user: 'Alice Johnson', type: 'incoming', duration: '5m 23s', time: '10m ago' },
                { id: 6, user: 'Unknown Number', type: 'missed', duration: '0s', time: '2h ago' },
                { id: 7, user: 'Bob Smith', type: 'outgoing', duration: '12m 4s', time: '1d ago' },
                { id: 8, user: 'Support', type: 'incoming', duration: '2m 10s', time: '1d ago' },
                { id: 9, user: 'Alice Johnson', type: 'incoming', duration: '5m 23s', time: '10m ago' },
                { id: 10, user: 'Unknown Number', type: 'missed', duration: '0s', time: '2h ago' },
                { id: 11, user: 'Bob Smith', type: 'outgoing', duration: '12m 4s', time: '1d ago' },
                { id: 12, user: 'Support', type: 'incoming', duration: '2m 10s', time: '1d ago' },
                { id: 13, user: 'Alice Johnson', type: 'incoming', duration: '5m 23s', time: '10m ago' },
                { id: 14, user: 'Unknown Number', type: 'missed', duration: '0s', time: '2h ago' },
                { id: 15, user: 'Bob Smith', type: 'outgoing', duration: '12m 4s', time: '1d ago' },
                { id: 16, user: 'Support', type: 'incoming', duration: '2m 10s', time: '1d ago' },
                { id: 17, user: 'Alice Johnson', type: 'incoming', duration: '5m 23s', time: '10m ago' },
                { id: 18, user: 'Unknown Number', type: 'missed', duration: '0s', time: '2h ago' },
                { id: 19, user: 'Bob Smith', type: 'outgoing', duration: '12m 4s', time: '1d ago' },
                { id: 20, user: 'Support', type: 'incoming', duration: '2m 10s', time: '1d ago' },
            ]);
        }, 100);
    });
}
