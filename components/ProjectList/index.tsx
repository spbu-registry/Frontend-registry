import React, {FC, useDeferredValue, useEffect, useState} from "react";
import styles from "./ProjectList.module.sass";
import {projects} from "./projects";
import ProjectCard from "./ProjectCard";
import {useDebounce} from "../TagFilter/useDebounce";
import search from "./Search";

interface ProjectListProps {
}

const ProjectList: FC<ProjectListProps> = () => {

    const useDebounce = (value: string, time: number) => {
        const [debounceValue, setDebounceValue] = useState(value);

        useEffect(() => {
            const timeout = setTimeout(() => {
                setDebounceValue(value);
            }, time);

            return () => {
                clearTimeout(timeout);
            };
        }, [value]);

        return debounceValue;
    };


    const [searchTerm, setSearchTerm] = useState<string>('');
    const keys = ["header", "clinic", "task", "status", "date"];

    const [results, setResults] = useState<any[]>([])

    const debouncedSearchTerm = useDebounce(searchTerm, 200);

    const getData = async (search: string) => {
        const response = await fetch(`http://localhost:3000/api/projects`);
        const data = await response.json();
        // return data.filter((project: any) =>
        //     keys.some((key) => project[key as keyof typeof project].toLowerCase().includes(search)))
        // setResults(data.filter((project: any) =>
        //     keys.some((key) => project[key as keyof typeof project].toLowerCase().includes(search))))
        if (search == '') {
            setResults(data.splice(0, 5));
        } else {
            setResults(data.filter((project: any) =>
                    keys.some(((key: string) =>
                        project[key].toLowerCase().includes(search.toLowerCase()))
                    )
                )
            )
        }

    }

    useEffect(() => {
        (getData(debouncedSearchTerm));
        // getData().then(json => {
        //     setSearchTerm(json);
        //     return json;
        // }).then(json => {
        //     setResults(json);
        // })
    }, [debouncedSearchTerm])

    // useEffect(
    //     () => {
    //         const getData = async () => {
    //             const response = await fetch(`http://localhost:3000/api/projects`);
    //             const data = await response.json();
    //             setResults(data.filter((project: any) =>
    //                 keys.some((key) => project[key as keyof typeof project].toLowerCase().includes(debouncedSearchTerm))))
    //         }
    //         getData()
    //     },
    //     [debouncedSearchTerm]
    // )

    return (
        <div>
            <input type="text"
                   onChange={(event) => setSearchTerm(event.target.value)}
            />

            <div className={styles.container}>
                {results.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        className={styles.project}
                    />
                ))}
            </div>

            {/*<div className={styles.container}>*/}
            {/*    {results.filter((project) =>*/}
            {/*        keys.some((key) => project[key as keyof typeof project].toLowerCase().includes(searchTerm.toLowerCase()))*/}
            {/*    ).map((project) => (*/}
            {/*        <ProjectCard*/}
            {/*            key={project.header}*/}
            {/*            project={project}*/}
            {/*            className={styles.project}*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</div>*/}

            <div>сортировка тегов</div>
            {/*<div className={styles.container}>*/}
            {/*  {projects.map((project) => (*/}
            {/*    <ProjectCard*/}
            {/*      key={project.header}*/}
            {/*      project={project}*/}
            {/*      className={styles.project}*/}
            {/*    />*/}
            {/*  ))}*/}
            {/*</div>*/}
        </div>
    );
};

export default ProjectList;
