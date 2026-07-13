import React from 'react';
import { Link } from 'react-router-dom';
import {
    Sparkles, ArrowRight, Heart, Zap, Shield,
    Target, Users, BrainCircuit, Activity,
    Moon, Sun, Sunrise, CloudMoon,
    Quote, Dumbbell, Leaf, Lock
} from 'lucide-react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import '../../styles/About.css';

const About: React.FC = () => {
    return (
        <div className="about-container">
            <Header />

            {/* ── Hero ── */}
            <section className="about-hero">
                <div className="about-hero-blur"></div>
                <div className="badge-premium animate-slideUp">
                    <Sparkles size={14} />
                    <span>Our Story</span>
                </div>
                <h1 className="about-hero-title animate-slideUp" style={{ animationDelay: '0.1s' }}>
                    Fitness Designed Around{' '}
                    <span className="text-gradient-purple">Your Biology.</span>
                </h1>
                <p className="about-hero-subtitle animate-slideUp" style={{ animationDelay: '0.2s' }}>
                    CycleSync AI is the world's first AI-powered fitness platform built to optimize
                    every workout, meal, and recovery session around the four phases of the menstrual cycle.
                </p>
            </section>

            {/* ── Mission Section ── */}
            <section className="about-mission">
                <div className="mission-grid">
                    <div className="mission-visual animate-fadeIn">
                        <div className="mission-image-wrapper">
                            <img
                                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800"
                                alt="Women training together"
                            />
                        </div>
                        <div className="mission-floating-stat animate-float">
                            <div>
                                <span className="stat-number">50K+</span>
                            </div>
                            <div>
                                <span className="stat-desc">Women training<br />in sync daily</span>
                            </div>
                        </div>
                    </div>

                    <div className="mission-content">
                        <span className="mission-label">
                            <Target size={16} />
                            Our Mission
                        </span>
                        <h2 className="mission-title">
                            Closing the Gender Gap in{' '}
                            <span className="text-gradient-teal">Fitness Science</span>
                        </h2>
                        <p className="mission-text">
                            For decades, fitness research has largely excluded female physiology.
                            Generic programs ignore the hormonal fluctuations that fundamentally
                            alter energy, strength, and recovery across every 28-day cycle.
                            We're here to change that.
                        </p>
                        <div className="mission-highlights">
                            <div className="highlight-item">
                                <div className="highlight-icon pink">
                                    <Heart size={22} />
                                </div>
                                <div className="highlight-text">
                                    <h4>Hormone-Aware Training</h4>
                                    <p>Workout intensity that adapts to your estrogen and progesterone levels.</p>
                                </div>
                            </div>
                            <div className="highlight-item">
                                <div className="highlight-icon blue">
                                    <BrainCircuit size={22} />
                                </div>
                                <div className="highlight-text">
                                    <h4>AI-Powered Insights</h4>
                                    <p>Machine learning models trained on real cycle data for accurate predictions.</p>
                                </div>
                            </div>
                            <div className="highlight-item">
                                <div className="highlight-icon teal">
                                    <Leaf size={22} />
                                </div>
                                <div className="highlight-text">
                                    <h4>Holistic Wellness</h4>
                                    <p>Nutrition, sleep, stress, and movement — all optimized in concert.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── The Science — 4 Phases ── */}
            <section className="about-science">
                <div className="science-inner">
                    <div className="science-header animate-slideUp">
                        <h2>The Science of <span className="text-gradient-purple">Cycle Syncing</span></h2>
                        <p>
                            Your body moves through four distinct hormonal phases each month.
                            We tailor everything to match.
                        </p>
                    </div>
                    <div className="phases-grid">
                        <div className="phase-card menstrual animate-slideUp" style={{ animationDelay: '0.1s' }}>
                            <div className="phase-icon-ring">
                                <Moon size={32} />
                            </div>
                            <h3>Menstrual</h3>
                            <span className="phase-days">Days 1–5</span>
                            <p>
                                Your body is at its lowest hormonal point. We prescribe gentle movement,
                                restorative yoga, and iron-rich nutrition to support recovery.
                            </p>
                        </div>
                        <div className="phase-card follicular animate-slideUp" style={{ animationDelay: '0.2s' }}>
                            <div className="phase-icon-ring">
                                <Sunrise size={32} />
                            </div>
                            <h3>Follicular</h3>
                            <span className="phase-days">Days 6–14</span>
                            <p>
                                Rising estrogen fuels energy and strength. This is your window for
                                high-intensity training, new PRs, and complex carbs.
                            </p>
                        </div>
                        <div className="phase-card ovulatory animate-slideUp" style={{ animationDelay: '0.3s' }}>
                            <div className="phase-icon-ring">
                                <Sun size={32} />
                            </div>
                            <h3>Ovulatory</h3>
                            <span className="phase-days">Days 15–17</span>
                            <p>
                                Peak hormones mean peak performance. We push group workouts,
                                HIIT sessions, and social accountability during this phase.
                            </p>
                        </div>
                        <div className="phase-card luteal animate-slideUp" style={{ animationDelay: '0.4s' }}>
                            <div className="phase-icon-ring">
                                <CloudMoon size={32} />
                            </div>
                            <h3>Luteal</h3>
                            <span className="phase-days">Days 18–28</span>
                            <p>
                                Progesterone rises; metabolism increases. We shift to steady-state cardio,
                                strength maintenance, and calorie-dense whole foods.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Values Section ── */}
            <section className="about-values">
                <div className="values-header animate-slideUp">
                    <h2>What We <span className="text-gradient-purple">Stand For</span></h2>
                    <p>The principles that guide every feature, algorithm, and interaction.</p>
                </div>
                <div className="values-grid">
                    <div className="value-card animate-slideUp" style={{ animationDelay: '0.1s' }}>
                        <div className="value-icon-wrapper gradient-purple">
                            <BrainCircuit size={30} />
                        </div>
                        <h3>Science-First</h3>
                        <p>Every recommendation is rooted in peer-reviewed endocrinology and sports science research.</p>
                    </div>
                    <div className="value-card animate-slideUp" style={{ animationDelay: '0.15s' }}>
                        <div className="value-icon-wrapper gradient-pink">
                            <Heart size={30} />
                        </div>
                        <h3>Empathy by Design</h3>
                        <p>We build for real women — not idealized models. Every body, every cycle, every phase matters.</p>
                    </div>
                    <div className="value-card animate-slideUp" style={{ animationDelay: '0.2s' }}>
                        <div className="value-icon-wrapper gradient-blue">
                            <Shield size={30} />
                        </div>
                        <h3>Privacy First</h3>
                        <p>Your health data is sacred. End-to-end encryption and HIPAA-compliant infrastructure, always.</p>
                    </div>
                    <div className="value-card animate-slideUp" style={{ animationDelay: '0.25s' }}>
                        <div className="value-icon-wrapper gradient-teal">
                            <Activity size={30} />
                        </div>
                        <h3>Adaptive Intelligence</h3>
                        <p>Our AI learns your unique patterns over time, getting smarter with every cycle you log.</p>
                    </div>
                    <div className="value-card animate-slideUp" style={{ animationDelay: '0.3s' }}>
                        <div className="value-icon-wrapper gradient-orange">
                            <Users size={30} />
                        </div>
                        <h3>Community Driven</h3>
                        <p>A supportive network of women and certified trainers who understand hormonal fitness.</p>
                    </div>
                    <div className="value-card animate-slideUp" style={{ animationDelay: '0.35s' }}>
                        <div className="value-icon-wrapper gradient-green">
                            <Zap size={30} />
                        </div>
                        <h3>Relentless Innovation</h3>
                        <p>We ship fast, iterate faster, and never stop pushing what's possible in femtech fitness.</p>
                    </div>
                </div>
            </section>

            {/* ── Story Quote Banner ── */}
            <section className="about-story-banner">
                <div className="story-banner-card animate-fadeIn">
                    <div className="story-quote-icon">
                        <Quote size={28} />
                    </div>
                    <h2>
                        "We believe every woman deserves a fitness plan
                        that <span className="text-gradient-purple">evolves with her</span> — not against her."
                    </h2>
                    <p>
                        Founded in 2024, CycleSync AI was born from a simple frustration:
                        why does the fitness industry still treat all bodies the same?
                        We set out to build the platform we wished existed — intelligent,
                        empathetic, and relentlessly personalized.
                    </p>
                </div>
            </section>

            {/* ── Final CTA ── */}
            <section className="about-cta">
                <h2 className="animate-slideUp">
                    Ready to Train <span className="text-gradient-purple">In Sync?</span>
                </h2>
                <p className="animate-slideUp" style={{ animationDelay: '0.1s' }}>
                    Join thousands of women who've unlocked their full potential
                    by training with their biology — not against it.
                </p>
                <div className="about-cta-actions animate-slideUp" style={{ animationDelay: '0.2s' }}>
                    <Link to="/register" className="btn btn-premium btn-lg">
                        Start Your Journey <ArrowRight size={20} />
                    </Link>
                    <Link to="/" className="btn btn-outline btn-lg">
                        Back to Home
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
