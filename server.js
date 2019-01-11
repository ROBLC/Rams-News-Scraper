import express from "express";
import mongoose from "mongoose";
import axios from "axios";
import cheerio from "cheerio";
import exphbs from "express-handlebars";

const PORT = process.env.PORT || 3000;

const app = express();

