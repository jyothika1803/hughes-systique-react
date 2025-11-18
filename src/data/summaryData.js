

import { Tag, FileText, UserRound } from "lucide-react";


const summaryData = {
  totalSales: '$1k',
  summary: [
    { title: 'Total Orders', value: '300', icon: FileText, change: '+5% from yesterday',  navigate:'/total-orders' },
    { title: 'Products Sold', value: '5', icon: Tag, change: '+12% from yesterday',  navigate:'/products' },
    { title: 'New Customers', value: '8', icon: UserRound, change: '0.5% from yesterday',  navigate:'' },
  ],
};

export default summaryData;
