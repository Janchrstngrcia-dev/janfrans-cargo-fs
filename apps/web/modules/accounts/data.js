export const userAccounts = [
  {
    id: 1,
    fullName: "John Doe",
    username: "john@janfrans.com",
    mobile: "+63 917 123 4567",
    userType: 1,
    status: 1,
    createdAt: "2025-01-15",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    username: "jane@janfrans.com",
    mobile: "+63 922 456 7890",
    userType: 2,
    status: 1,
    createdAt: "2025-02-20",
  },
  {
    id: 3,
    fullName: "Mike Johnson",
    username: "mike@janfrans.com",
    mobile: "+63 915 789 0123",
    userType: 3,
    status: 1,
    createdAt: "2025-03-10",
  },
  {
    id: 4,
    fullName: "Sarah Williams",
    username: "sarah@janfrans.com",
    mobile: "+63 928 234 5678",
    userType: 4,
    status: 0,
    createdAt: "2025-04-05",
  },
  {
    id: 5,
    fullName: "Chris Brown",
    username: "chris@janfrans.com",
    mobile: "+63 919 567 8901",
    userType: 2,
    status: 1,
    createdAt: "2025-05-18",
  },
  {
    id: 6,
    fullName: "Emily Davis",
    username: "emily@janfrans.com",
    mobile: "+63 935 890 1234",
    userType: 3,
    status: 1,
    createdAt: "2025-06-22",
  },
  {
    id: 7,
    fullName: "David Wilson",
    username: "david@janfrans.com",
    mobile: "+63 917 901 2345",
    userType: 4,
    status: 1,
    createdAt: "2025-07-30",
  },
  {
    id: 8,
    fullName: "Lisa Anderson",
    username: "lisa@janfrans.com",
    mobile: "+63 922 012 3456",
    userType: 3,
    status: 0,
    createdAt: "2025-08-14",
  },
]

export const clientAccounts = [
  {
    id: 1,
    fullName: "ABC Corporation",
    username: "contact@abc.com",
    mobile: "+63 917 123 4567",
    userType: 6,
    status: 1,
    createdAt: "2025-01-10",
  },
  {
    id: 2,
    fullName: "Maria Santos",
    username: "maria@gmail.com",
    mobile: "+63 922 456 7890",
    userType: 5,
    status: 1,
    createdAt: "2025-02-15",
  },
  {
    id: 3,
    fullName: "XYZ Industries",
    username: "info@xyz.com",
    mobile: "+63 915 789 0123",
    userType: 6,
    status: 1,
    createdAt: "2025-03-20",
  },
  {
    id: 4,
    fullName: "Juan Dela Cruz",
    username: "juan@yahoo.com",
    mobile: "+63 928 234 5678",
    userType: 5,
    status: 0,
    createdAt: "2025-04-25",
  },
  {
    id: 5,
    fullName: "Prime Logistics",
    username: "prime@logistics.com",
    mobile: "+63 919 567 8901",
    userType: 6,
    status: 1,
    createdAt: "2025-05-30",
  },
  {
    id: 6,
    fullName: "Pedro Garcia",
    username: "pedro@gmail.com",
    mobile: "+63 935 890 1234",
    userType: 5,
    status: 1,
    createdAt: "2025-06-05",
  },
]

export const getUserType = (type) => {
  const types = {
    1: "Super Admin",
    2: "Admin",
    3: "Staff",
    4: "Driver",
    5: "Individual",
    6: "Corporate",
  }
  return types[type] || "Unknown"
}

export const getUserStatus = (status) => {
  return status === 1 ? "Active" : "Inactive"
}
export const accounts = userAccounts
