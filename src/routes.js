import Home from './sections/Home';
import ConstraintChain from './sections/ConstraintChain';

const routes = [
    {
        name: "Constraint - Basic Distance",
        path: "/",
        component: Home,
    },
    {
        name: "Constraint - Distance Chain",
        path: '/constraint-chain',
        component: ConstraintChain,
    },
    {
        name: "Constraint - FABRIK Chain",
        path: '/constraint-fabrik',
        component: null,
    },
    {
        name: "Constraint - Collission Constraint",
        path: '/constraint-collision',
        component: null,
    },
    {
        name: "Constraint - Collission Constraint w/ Verlet",
        path: '/constraint-collision-verlet',
        component: null,
    },
    {
        name: "Constraint - Verlet Rope",
        path: '/constraint-verlet-rope',
        component: null,
    },
    {
        name: "Constraint - Volume Preserving Soft Body",
        path: '/constraint-volume-preserving-soft-body',
        component: null,
    },
];

export default routes;