#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;

uniform vec3 light_ambient;
uniform vec3 light_position[10];
uniform vec3 light_color[10];
uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n

out vec4 FragColor;

void main() {
    vec3 ambient = light_ambient * material_color;
    vec3 specular;
    vec3 diffuse;
    // temps will eventually be removed and only light_position[i] or color will need to be referenced
    vec3 light_positiontemp[10];
    vec3 light_colortemp[10];
    light_positiontemp[0] = vec3(1.5, 3.0, -4.5);
    light_colortemp[0] = vec3(1.0, 1.0, .8);
    for(int i = 0; i < 10; i++)
    {
        vec3 light_vector = normalize(light_positiontemp[i] - frag_pos);
        float diffdot = dot(frag_normal, light_vector);
        if(diffdot < 0.0) 
        {
            diffdot = 0.0;
        }
        
        vec3 view_vector = normalize(camera_position - frag_pos);
        vec3 reflection = normalize(reflect(-light_vector, frag_normal));
        float specdot = dot(reflection, view_vector);
        if(specdot < 0.0)
        {
            specdot = 0.0;
        }

        diffuse += light_colortemp[i] * material_color * diffdot;
        specular += light_colortemp[i] * material_specular * pow(specdot, material_shininess);
    }
    FragColor = vec4(ambient + diffuse + specular, 1.0);
}