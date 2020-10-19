
Vue.component('skill-item', {
    props: ['skill'],
    template: `<div class="row habilidades">
                    <div class="col-6">
                        <span>{{skill.text}}</span>
                        </div>
                        <div class="col-6">
                        <div class="bar-wrapper">
                        <div class="bar">
                                <div v-bind:style="{ width: skill.percent + '%' }"></div>
                                </div>
                        </div>
                    </div>
                </div>`
});

Vue.component('column-item', {
    props: ['column'],
    template: `<div v-bind:class="col(column.size)">
                    <h4>{{column.title}}</h4>
                    <ul v-html="description"></ul>
                </div>`,
    methods: {
        col (size) {
            return size > 0 ? 'col-' + size : 'col';
        }
    },
    computed: {
        description () {
            return '<li>' + this.column.text.replace(/\r?\n/g, '</li><li>') + '</li>';
        },
    }
});

Vue.component('skill-column-item', {
    props: ['column'],
    template: `<div v-bind:class="col(column.size)">
                    <h4>{{column.title}}</h4>
                    <div v-if="column.split" class="row">
                        <div v-for="(split, index) in column.split" v-bind:class="col(split)">
                            <skill-item v-for="skill in cut(column.skills, column.split, index)" v-bind:skill="skill"></skill-item>
                        </div>
                    </div>
                    <div v-else>
                        <skill-item v-for="skill in column.skills" v-bind:skill="skill"></skill-item>
                    </div>
                </div>`,
    methods: {
        col (size) {
            return size > 0 ? 'col-' + size : 'col';
        },
        cut (array, splitArray, index) {
            var newArray = [...array];
            if (index == 0)
                return newArray.splice(0, Math.ceil(array.length / splitArray.length));
            return newArray.splice(Math.floor(array.length / splitArray.length), array.length);
        }
    }
});

Vue.component('timeline-item', {
    props: ['item'],
    template: `<div class="container-right" v-bind:class="{'companyless': !hasTitle() }">
                    <div class="content">
                        <div class="row experience">
                            <div class="col-12" v-if="hasTitle()">
                                <h3>{{item.title}}</h3>
                            </div>
                            <div class="col-7">
                                <h4>{{item.position}}</h4>
                            </div>
                            <div class="col-5 text-right">
                                <span class="date">{{item.start}} - {{item.end}}</span>
                            </div>
                            <div class="col-12">
                                <ul v-html="description"></ul>
                                <!--<p>{{item.text}}</p>-->
                            </div>
                        </div>
                    </div>
                </div>`,
    methods: {
        hasTitle () {
            return this.item.title && this.item.title.length > 0;
        }
    },
    computed: {
        description () {
            return '<li>' + this.item.text.replace(/\r?\n/g, '</li><li>') + '</li>';
        },
    }
});

Vue.component('simple-item', {
    props: ['item'],
    template: `<div>
                    <h4>{{item.title}}</h4>
                    <h5>{{item.location}}</h5>
                    <h5 class="date">{{item.date}}</h5>
                    <p class="title-p">{{item.text}}</p>
                </div>`
});

var app = new Vue({
    el: '#wrapper',
    data: {
        debug: false,
        toggled: false,
        photo: "./assets/metal.jpg",
        name: "Tácito Mello Viero",
        computerSkills: [
            {
                title: 'Languages', size: 0, skills: [
                    { text: 'C#', percent: 90 },
                    { text: 'HTML', percent: 100 },
                    { text: 'CSS', percent: 95 },
                    { text: 'Javascript', percent: 85 },
                    { text: 'SQL', percent: 70 },
                    { text: 'Dart', percent: 70 },
                    { text: 'Java', percent: 60 },
                    { text: 'Python', percent: 50 },
                    { text: 'React', percent: 20 }
                ]
            },
            {
                title: 'Frameworks', size: 0, skills: [
                    { text: '.NET / .NET Core', percent: 90 },
                    { text: 'EF / EF Core', percent: 75 },
                    { text: 'ASP.NET', percent: 90 },
                    { text: 'Dapper', percent: 70 },
                    { text: 'Bootstrap', percent: 95 },
                    { text: 'Flutter', percent: 70 },
                    { text: 'Vue', percent: 70 },
                    { text: 'jQuery', percent: 90 },
                    { text: 'Ionic', percent: 80 }
                ]
            },
            {
                title: 'Concepts', size: 0, skills: [
                    { text: 'Prog. Logic', percent: 90 },
                    { text: 'Restful', percent: 90 },
                    { text: 'Lean', percent: 85 },
                    { text: 'MVC', percent: 90 },
                    { text: 'MVVM', percent: 85 },
                    { text: 'SPA', percent: 80 },
                    { text: 'SEO', percent: 85 },
                    { text: 'Project Mgmt.', percent: 70 },
                    { text: 'Quality Assurance', percent: 80 }
                ]
            },
            {
                title: 'Databases', size: 0, skills: [
                    { text: 'MSSQL', percent: 80 },
                    { text: 'MySQL', percent: 80 },
                    { text: 'elasticsearch', percent: 70 },
                    { text: 'mongodb', percent: 65 }
                ]
            },
            {
                title: 'Tools', size: 0, skills: [
                    { text: 'Amazon Services', percent: 90 },
                    { text: 'Azure Services', percent: 80 },
                    { text: 'Visual Studio', percent: 80 },
                    { text: 'VS Code', percent: 90 },
                    { text: 'Postman', percent: 75 },
                    { text: 'Node', percent: 70 },
                    { text: 'bash', percent: 70 },
                    { text: 'Selenium', percent: 80 },
                    { text: 'Apache jMeter', percent: 65 }
                ]
            }
        ],
        professionalExperiences: [
            {
                title: 'Ayra Labs',
                start: 'July/2020',
                end: 'currently',
                position: 'Owner',
                text: `Ayra Labs main focus is to better understand and deliver web experiences to connect people.`
            },
            {
                title: 'Traust.it',
                start: 'January/2017',
                end: 'June/2020',
                position: 'Founder & CTO',
                text: `Founder of a small software house focused on developing systems for small and medium local companies
                    Made projects from scratch, maintained legacy code, built third-party integrations and deployed cloud mobile apps
                    Worked closely with client’s multiple internal teams to achieve digital tech transformations
                    Responsible for the design, planning, implementation and deployment of systems, for a range of devices and platforms
                    Managed the development team, employing agile methodologies.`
            },
            {
                title: 'S4Fans',
                start: 'February/2016',
                end: 'December/2016',
                position: 'Technical Leader',
                text: `As the head of development, worked on developing user experience strategies to improve website ads revenue
                    Made easy, zero-configuration delivery system for those strategies
                    Built the company’s enterprise platform, a system capable of deploying an hybrid mobile app integrating blog, YouTube and other client's social media.`
            },
            {
                title: '',
                start: 'January/2015',
                end: 'January/2016',
                position: 'Full-stack Developer',
                text: `Helped building one of the biggest price comparison systems in Brazil, all white-label, with one-click configuration
                    Engineered new features, both on the system’s frontend as well as in the backend
                    Kept the backend, environment and architecture in an pristine state
                    Built a powerful anonymous tracking system which got our payment split even against deceptive tactics
                    Programmatically scraped e-commerce sites while consolidating multiple information structures into one
                    Design and implementation of partner’s homesites and maintenance of clustered databases daily.`
            },
            {
                title: 'DevelopIT Computer Systems',
                start: 'October/2012',
                end: 'December/2014',
                position: 'Full-stack Developer',
                text: `Worked in a startup project inside the company helping on many different fields, like sales, design, planning new features and development
                    Made a project to help plan and organize travel memories
                    Built a system capable of indexing a selection of products from many e-commerce sites.`
            },
            {
                title: 'WSI Digital Marketing',
                start: 'March/2012',
                end: 'September/2012',
                position: 'Web Developer',
                text: `Built and delivered many websites and e-commerces for company’s clients, with interesting degrees of new features
                    Kept many client accounts up to date on a shared cloud hosting system
                    Worked with the client through design, sale process, development and the final deploy on different web hosts.`
            },
            {
                title: 'Dell Computadores do Brasil Ltda.',
                start: 'December/2009',
                end: 'March/2011',
                position: 'Test Analyst – Internship',
                text: `Creation and execution of scenarios and test cases. 
                    Development of scripts both to generate test data sets as well test some cases. 
                    Scripts went through many different systems, with test cases usually starting in the web and finishing in the mainframe's terminal.`
            },
            {
                title: 'PUCRS / DBServer agreement',
                start: 'August/2009',
                end: 'December/2009',
                position: 'Test Analyst - Internship',
                text: `Research in the field of performance testing
                    Created a test process as a service for use of both university and company.`
            },
            {
                title: 'Microsoft Innovation Center',
                start: 'January/2009',
                end: 'August/2009',
                position: 'Functional Tester - Internship',
                text: `Verification of non-conformities of tax application programs through an agreement with the Federal Revenue Service
                    Built the SiVeL software – capable of automatically test different tax application document layouts.`
            },
            {
                title: '',
                start: 'August/2008',
                end: 'January/2009',
                position: '.NET Developer - Internship',
                text: `Small developer assignments
                    Created the Tax Application Program Testing Group
                    Teacher in the Microsoft S2B - Students to Business program.`
            }
        ],
        humanSkills: [
            {
                title: 'Behavioral', size: 8, split: [6, 6], skills: [
                    { text: 'Complex problem solving', percent: 85 },
                    { text: 'Critical thinking', percent: 90 },
                    { text: 'Creativity', percent: 95 },
                    { text: 'People management', percent: 70 },
                    { text: 'Coordinating with others', percent: 90 },
                    { text: 'Emotional intelligence', percent: 80 },
                    { text: 'Judgment and decision making', percent: 70 },
                    { text: 'Service orientation', percent: 90 },
                    { text: 'Cognitive flexibility', percent: 90 },
                    { text: 'Communication', percent: 70 }

                ]
            },
            {
                title: 'Languages', size: 4, skills: [
                    { text: 'Portuguese', percent: 95 },
                    { text: 'English', percent: 85 },
                    { text: 'French', percent: 40 },
                    { text: 'Spanish', percent: 30 },
                    { text: 'Italian', percent: 20 },
                ]
            }
        ],
        activities: [
            {
                title: 'Entrepreneur Ecosystem',
                text: `Director of Technology at AGS, the state startup association
                Mentor at the local NASA Space Apps Challenge
                Mentor at the local Startup Weekend
                Judge in the StartupRS Makers.`
            },
            {
                title: 'Continuous Learning',
                text: `Chosen by Itamaraty to be part of Smart City Expo World Congress
                Winner of the IBM DevOps Hackathon
                Participated in the InovAtiva Brasil acceleration program
                Participated in the StartupRS Digital incubation program.`
            }
        ]
    },
    methods: {
        addSkill () {
            this.skills.push();
        }
    }
});