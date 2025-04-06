// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = '#FFFFFF';
    }
});

// 示例素材数据
const sampleMaterials = [
    {
        id: 1,
        title: '「白族」云裳仙子',
        category: '民族服饰',
        image: './images/白族女1.png',
        description: '白族传统服饰设计，蓝色为主调，搭配精美刺绣和花卉图案，适合优雅女性角色设计',
        type: 'premium',
        points: 120
    },
    {
        id: 2,
        title: '「白族」玉面郎君',
        category: '民族服饰',
        image: './images/白族男1.png',
        description: '白族服饰现代演绎，保留传统元素的同时融入现代设计，适合时尚游戏角色',
        type: 'premium',
        points: 150
    },
    {
        id: 3,
        title: '「苗族」银铃少女',
        category: '民族服饰',
        image: './images/苗族女1.jpeg',
        description: '苗族传统银饰与服装组合，展现浓郁的民族特色，适合精致角色设计',
        type: 'limited',
        points: 0
    },
    {
        id: 4,
        title: '「苗族」蝶舞公主',
        category: '民族服饰',
        image: './images/苗族女2.jpeg',
        description: '苗族节日盛装设计，融合传统头饰与现代元素，适合重要场景角色设计',
        type: 'premium',
        points: 180
    },
    {
        id: 5,
        title: '「佤族」山寨勇士',
        category: '民族服饰',
        image: './images/佤族女2男1.jpeg',
        description: '佤族男性传统服饰，简约大方的设计风格，适合男性角色设计',
        type: 'free',
        points: 0
    },
    {
        id: 6,
        title: '「佤族」茶山精灵',
        category: '民族服饰',
        image: './images/佤族女1.jpeg',
        description: '佤族女性传统服饰，红黑配色突出，适合女性角色设计',
        type: 'premium',
        points: 100
    },
    {
        id: 7,
        title: '「彝族」火山公主',
        category: '民族服饰',
        image: './images/彝族女1.jpeg',
        description: '彝族传统服饰设计，黑色为主色调，搭配精美刺绣，适合庄重角色设计',
        type: 'premium',
        points: 150
    },
    {
        id: 8,
        title: '「彝族」星月少女',
        category: '民族服饰',
        image: './images/彝族女2.png',
        description: '彝族服饰现代风格演绎，保留传统元素，适合现代游戏场景',
        type: 'limited',
        points: 0
    }
];

// 动态加载素材展示
function loadShowcaseMaterials(type = 'all') {
    const showcaseGrid = document.querySelector('.showcase-grid');
    if (!showcaseGrid) return;
    
    // 清空现有内容
    showcaseGrid.innerHTML = '';
    
    // 根据类型筛选素材
    let filteredMaterials = sampleMaterials;
    if (type !== 'all') {
        filteredMaterials = sampleMaterials.filter(material => material.type === type);
    }
    
    // 如果没有找到素材，显示提示信息
    if (filteredMaterials.length === 0) {
        showcaseGrid.innerHTML = '<div class="no-materials">暂无相关素材</div>';
        return;
    }
    
    // 渲染素材卡片
    filteredMaterials.forEach(material => {
        const materialCard = document.createElement('div');
        materialCard.className = 'material-card';
        
        // 根据素材类型添加标签
        let typeLabel = '';
        if (material.type === 'free') {
            typeLabel = '<span class="material-tag free">免费</span>';
        } else if (material.type === 'premium') {
            typeLabel = '<span class="material-tag premium">会员专享</span>';
        } else if (material.type === 'limited') {
            typeLabel = '<span class="material-tag limited">限时免费</span>';
        }
        
        materialCard.innerHTML = `
            <div class="material-image">
                <img src="${material.image}" alt="${material.title}">
                ${typeLabel}
            </div>
            <div class="material-info">
                <h3>${material.title}</h3>
                <p class="category">${material.category}</p>
                <p class="description">${material.description}</p>
                <div class="material-footer">
                    ${material.type === 'free' || material.type === 'limited' ? 
                        '<button class="btn-download">下载素材</button>' : 
                        `<button class="btn-download" disabled>需要${material.points}积分</button>`}
                </div>
            </div>
        `;
        showcaseGrid.appendChild(materialCard);
    });
}

// 标签切换功能
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    if (!tabButtons.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前按钮添加active类
            this.classList.add('active');
            // 获取对应的素材类型
            const type = this.getAttribute('data-tab');
            // 加载对应类型的素材
            loadShowcaseMaterials(type);
        });
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 加载全部素材
    loadShowcaseMaterials();
    
    // 初始化标签切换功能
    initTabs();
    
    // 添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 为会员升级按钮添加事件监听
    const upgradeButtons = document.querySelectorAll('a[href="#upgrade"]');
    upgradeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showMembershipModal();
        });
    });
});

// 登录/注册模态框
function showModal(type) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${type === 'login' ? '登录' : '注册'}</h2>
            <form id="${type}-form">
                ${type === 'register' ? '<input type="text" placeholder="用户名" required>' : ''}
                <input type="email" placeholder="邮箱" required>
                <input type="password" placeholder="密码" required>
                ${type === 'register' ? '<input type="password" placeholder="确认密码" required>' : ''}
                <button type="submit">${type === 'login' ? '登录' : '注册'}</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    // 关闭模态框
    modal.querySelector('.close').onclick = function() {
        modal.remove();
    };

    // 点击模态框外部关闭
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.remove();
        }
    };
}

// 会员升级模态框
function showMembershipModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content membership-modal">
            <span class="close">&times;</span>
            <h2>选择会员等级</h2>
            <div class="membership-options">
                <div class="membership-option">
                    <h3>基础会员</h3>
                    <p class="price">¥18/月</p>
                    <ul>
                        <li>每月可下载15个标准素材</li>
                        <li>享受基础客服支持</li>
                    </ul>
                    <button class="btn-upgrade" data-plan="basic">立即升级</button>
                </div>
                <div class="membership-option">
                    <h3>高级会员</h3>
                    <p class="price">¥48/月</p>
                    <ul>
                        <li>无限下载标准素材</li>
                        <li>享受技术咨询服务</li>
                    </ul>
                    <button class="btn-upgrade" data-plan="premium">立即升级</button>
                </div>
                <div class="membership-option">
                    <h3>专业会员</h3>
                    <p class="price">¥188/月</p>
                    <ul>
                        <li>无限下载所有素材</li>
                        <li>享受定制化设计指导服务</li>
                    </ul>
                    <button class="btn-upgrade" data-plan="professional">立即升级</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // 关闭模态框
    modal.querySelector('.close').onclick = function() {
        modal.remove();
    };

    // 点击模态框外部关闭
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.remove();
        }
    };
    
    // 为升级按钮添加事件监听
    const upgradeButtons = modal.querySelectorAll('.btn-upgrade');
    upgradeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.getAttribute('data-plan');
            // 这里可以添加支付逻辑
            alert(`您已选择${plan}会员，即将跳转到支付页面...`);
            modal.remove();
        });
    });
}

// 为登录和注册按钮添加事件监听
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.querySelector('.btn-login');
    const registerBtn = document.querySelector('.btn-register');

    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showModal('login');
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showModal('register');
        });
    }
}); 