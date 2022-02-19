# Data Visualizer Theme for MODX

**Core MODX files are not included.**
Download a copy here: https://modx.com/download or install via Gitify(https://docs.modmore.com/en/Open_Source/Gitify/Commands/MODX_Install.html)

## Installing a MODX Instance using Gitify

https://docs.modmore.com/en/Open_Source/Gitify/Commands/MODX_Install.html

Start by `cd [my_modx_instance_dir]` into the directory you want to install the CMS.

Install the latest version of MODX, or the one you specified by running:

`gitify modx:install` or `modx:install [modx_version]`

**After downloading you will be prompted to define your instance**

    Database Host [localhost]:
    Database Name [my_modx_instance_dir]: db_name_you_specified
    Database User [root]:
    Database Password:
    Database Prefix [modx_]:
    Hostname [users-MacBook-Pro.local]:
    Base URL [/]: my_modx_instance_dir
    Manager Language [en]:
    Manager User [my_modx_instance_dir_admin]:
    Manager User Password [generated]:
    Manager Email: johndoe@domain.com

## \_data Directory

This directory is composed of a series of xaml files with all the information that will be set in the database. Run the following commands to start the process:

`gitify package:install --all`
`gitify build -f`

## assets/themes/zimagi_data_visualizer

Contains all images, css, customizations, fonts, etc. needed to style the theme.
