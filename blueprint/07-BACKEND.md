---
Document: 07-BACKEND
Project: FERRO.OS
Version: 1.0.0
Status: Active
Last Updated: 2026-07-22
Author: Kristian Kamilo Ferrin
---

# 07 - BACKEND

> "The frontend creates the illusion. The backend makes it real."

---

# Purpose

The backend is responsible for powering FERRO.OS.

It provides data.

Stores progress.

Delivers content.

Handles future authentication.

Tracks exploration.

Manages every module.

The frontend never contains business logic.

---

# Technology Stack

Framework

NestJS

Language

TypeScript

Runtime

Node.js

Database

PostgreSQL

ORM

TypeORM

Validation

class-validator

Authentication

JWT (Future)

File Storage

Cloudinary

Documentation

Swagger

Logging

Pino

Environment

Docker Ready

Deployment

Railway / Render / VPS

---

# Architecture

The backend follows a modular architecture.

Each feature is completely isolated.

Modules communicate only through services.

```
Client

↓

REST API

↓

Controllers

↓

Services

↓

Repositories

↓

PostgreSQL
```

---

# Folder Structure

```
ferro-api/

│

├── src/
│
├── modules/
│   ├── projects/
│   ├── music/
│   ├── explorer/
│   ├── achievements/
│   ├── timeline/
│   ├── resume/
│   ├── skills/
│   ├── terminal/
│   ├── notifications/
│   ├── settings/
│   ├── ai-lab/
│   └── system/
│
├── common/
│   ├── decorators/
│   ├── guards/
│   ├── interceptors/
│   ├── filters/
│   ├── pipes/
│   ├── constants/
│   └── utils/
│
├── database/
│
├── config/
│
├── app.module.ts
│
└── main.ts
```

---

# API Philosophy

The API should be:

Simple

Predictable

RESTful

Fast

Scalable

Documented

Every endpoint returns the same response structure.

Example

```
{
    success: true,
    data: {},
    message: "",
    timestamp: ""
}
```

Errors follow the same format.

---

# Core Modules

## System

Returns

Version

Health

Status

Configuration

Wallpaper

System Information

---

## Projects

Stores every software project.

Properties

title

slug

description

stack

images

github

demo

architecture

status

featured

order

---

## Music

Stores music portfolio.

Tracks

Albums

Artwork

Streaming Links

Genres

Duration

Release Date

---

## Resume

Professional information.

Experience

Education

Languages

Certificates

Download URL

---

## Skills

Stores every technical skill.

Categories

Frontend

Backend

Database

Cloud

DevOps

AI

Soft Skills

---

## Timeline

Chronological history.

Milestones.

Projects.

Career.

Personal growth.

---

## Explorer

One of the most important modules.

Stores

Exploration percentage

Unlocked modules

Secrets found

Achievements

Visited modules

Current mission

Session statistics

---

## Achievements

Stores

Name

Description

Icon

Reward

Unlock Condition

Progress

Hidden

Unlocked

---

## Notifications

Stores dynamic notifications.

Examples

Achievement unlocked.

System updated.

Module discovered.

Secret found.

---

## Terminal

Provides terminal commands.

Examples

whoami

projects

skills

music

help

version

future

Each command returns structured responses.

---

## AI Lab

Future module.

Stores

Experiments.

AI demos.

Prompt engineering.

Agents.

Automation.

Initially disabled.

---

# Database

Primary Database

PostgreSQL

Future

Redis

For caching.

Future

ElasticSearch

For fast searching.

---

# Authentication

Version 1

No authentication.

Portfolio is public.

Version 2

Admin Dashboard.

JWT.

Refresh Tokens.

Role Management.

---

# Upload System

Cloudinary

Stores

Images

Artwork

Screenshots

Certificates

Future

Audio previews.

Videos.

---

# Logs

The backend stores logs.

Examples

Visitor opened Projects.

Visitor reached 50%.

Visitor discovered Terminal.

Visitor unlocked AI Lab.

Logs help understand how visitors explore FERRO.OS.

No personal data is collected without consent.

---

# Analytics

Future dashboard.

Statistics

Most visited modules.

Average exploration.

Time spent.

Popular projects.

Most discovered secret.

Completion rate.

---

# Performance Goals

API Response

<150ms

Database Queries

Optimized

Pagination

Required

Caching

Future

Compression

Enabled

Lazy Loading

Supported

---

# Security

Helmet

Rate Limiting

Validation Pipes

DTO Validation

Environment Variables

CORS

Input Sanitization

Secure Headers

No sensitive information exposed.

---

# Documentation

Swagger is mandatory.

Every endpoint documented.

DTO examples included.

Request examples included.

Error responses documented.

---

# Testing

Unit Tests

Jest

Integration Tests

Nest Testing Module

E2E Tests

Planned

Coverage Target

90%

---

# Future Features

OAuth Login

Visitor Profiles

Cloud Save

Admin Dashboard

Content Management

Module Editor

Achievement Editor

Music Manager

Project Manager

Real-time Notifications

AI Assistant API

Plugin System

---

# Backend Rules

Business logic never lives in the frontend.

Controllers remain thin.

Services contain logic.

Repositories access the database.

DTOs validate requests.

Entities represent the database.

Every module is independent.

No circular dependencies.

---

# Final Principle

The backend should never know how FERRO.OS looks.

It only knows how FERRO.OS works.