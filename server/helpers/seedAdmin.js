const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    try {
       

        // 1. Seed Roles
        const roles = [
            { roleId: 1, roleName: 'learner', description: 'Student role' },
            { roleId: 2, roleName: 'instructor', description: 'Instructor role' },
            { roleId: 3, roleName: 'admin', description: 'Administrator role' }
        ];

        for (const role of roles) {
            await Role.findOneAndUpdate({ roleId: role.roleId }, role, { upsert: true });
        }
       

        // 2. Seed Admin User
        const adminEmail = 'admin@kattran.com';
        let admin = await User.findOne({ userEmail: adminEmail });

        const hashedPassword = await bcrypt.hash('admin123', 10);

        if (admin) {
            console.log('🔄 Updating existing Admin user...');
            admin.password = hashedPassword;
            admin.roles = [1, 2, 3];
            admin.status = 'active';
            await admin.save();
        } else {
            console.log('✨ Creating new Admin user...');
            await User.create({
                userName: 'Platform Admin',
                userEmail: adminEmail,
                password: hashedPassword,
                roles: [1, 2, 3],
                status: 'active'
            });
        }
    
    } catch (error) {
        console.error('❌ Admin Seeding FAILED:', error.message);
    }
};

module.exports = seedAdmin;
